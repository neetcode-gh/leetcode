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
    def distributeCoins(self, root: Optional[TreeNode]) -> int:
        self.res = 0

        def dfs(cur):
            if not cur:
                return [0, 0]  # [size, coins]

            l_size, l_coins = dfs(cur.left)
            r_size, r_coins = dfs(cur.right)

            size = 1 + l_size + r_size
            coins = cur.val + l_coins + r_coins
            self.res += abs(size - coins)

            return [size, coins]

        dfs(root)
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
    private int res;

    public int distributeCoins(TreeNode root) {
        res = 0;
        dfs(root);
        return res;
    }

    private int[] dfs(TreeNode cur) {
        if (cur == null) {
            return new int[]{0, 0}; // [size, coins]
        }

        int[] left = dfs(cur.left);
        int[] right = dfs(cur.right);

        int size = 1 + left[0] + right[0];
        int coins = cur.val + left[1] + right[1];
        res += Math.abs(size - coins);

        return new int[]{size, coins};
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
private:
    int res;

    vector<int> dfs(TreeNode* cur) {
        if (!cur) {
            return {0, 0}; // [size, coins]
        }

        vector<int> left = dfs(cur->left);
        vector<int> right = dfs(cur->right);

        int size = 1 + left[0] + right[0];
        int coins = cur->val + left[1] + right[1];
        res += abs(size - coins);

        return {size, coins};
    }

public:
    int distributeCoins(TreeNode* root) {
        res = 0;
        dfs(root);
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
    distributeCoins(root) {
        let res = 0;

        const dfs = (cur) => {
            if (!cur) {
                return [0, 0]; // [size, coins]
            }

            let [lSize, lCoins] = dfs(cur.left);
            let [rSize, rCoins] = dfs(cur.right);

            let size = 1 + lSize + rSize;
            let coins = cur.val + lCoins + rCoins;
            res += Math.abs(size - coins);

            return [size, coins];
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
    private int res;

    public int DistributeCoins(TreeNode root) {
        res = 0;
        Dfs(root);
        return res;
    }

    private int[] Dfs(TreeNode cur) {
        if (cur == null) {
            return new int[] { 0, 0 }; // [size, coins]
        }

        int[] left = Dfs(cur.left);
        int[] right = Dfs(cur.right);

        int size = 1 + left[0] + right[0];
        int coins = cur.val + left[1] + right[1];
        res += Math.Abs(size - coins);

        return new int[] { size, coins };
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
func distributeCoins(root *TreeNode) int {
    res := 0

    var dfs func(cur *TreeNode) (int, int)
    dfs = func(cur *TreeNode) (int, int) {
        if cur == nil {
            return 0, 0 // size, coins
        }

        lSize, lCoins := dfs(cur.Left)
        rSize, rCoins := dfs(cur.Right)

        size := 1 + lSize + rSize
        coins := cur.Val + lCoins + rCoins
        if size > coins {
            res += size - coins
        } else {
            res += coins - size
        }

        return size, coins
    }

    dfs(root)
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
    private var res = 0

    fun distributeCoins(root: TreeNode?): Int {
        res = 0
        dfs(root)
        return res
    }

    private fun dfs(cur: TreeNode?): IntArray {
        if (cur == null) {
            return intArrayOf(0, 0) // [size, coins]
        }

        val left = dfs(cur.left)
        val right = dfs(cur.right)

        val size = 1 + left[0] + right[0]
        val coins = cur.`val` + left[1] + right[1]
        res += kotlin.math.abs(size - coins)

        return intArrayOf(size, coins)
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
    private var res = 0

    func distributeCoins(_ root: TreeNode?) -> Int {
        res = 0
        dfs(root)
        return res
    }

    private func dfs(_ cur: TreeNode?) -> (Int, Int) {
        guard let cur = cur else {
            return (0, 0) // (size, coins)
        }

        let (lSize, lCoins) = dfs(cur.left)
        let (rSize, rCoins) = dfs(cur.right)

        let size = 1 + lSize + rSize
        let coins = cur.val + lCoins + rCoins
        res += abs(size - coins)

        return (size, coins)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Depth First Search (Optimal)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def distributeCoins(self, root: Optional[TreeNode]) -> int:
        self.res = 0

        def dfs(cur):
            if not cur:
                return 0  # extra_coins

            l_extra = dfs(cur.left)
            r_extra = dfs(cur.right)

            extra_coins = cur.val - 1 + l_extra + r_extra
            self.res += abs(extra_coins)
            return extra_coins

        dfs(root)
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
    private int res;

    public int distributeCoins(TreeNode root) {
        res = 0;
        dfs(root);
        return res;
    }

    private int dfs(TreeNode cur) {
        if (cur == null) {
            return 0; // extra_coins
        }

        int lExtra = dfs(cur.left);
        int rExtra = dfs(cur.right);

        int extraCoins = cur.val - 1 + lExtra + rExtra;
        res += Math.abs(extraCoins);
        return extraCoins;
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
private:
    int res;

    int dfs(TreeNode* cur) {
        if (!cur) {
            return 0; // extra_coins
        }

        int lExtra = dfs(cur->left);
        int rExtra = dfs(cur->right);

        int extraCoins = cur->val - 1 + lExtra + rExtra;
        res += abs(extraCoins);
        return extraCoins;
    }

public:
    int distributeCoins(TreeNode* root) {
        res = 0;
        dfs(root);
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
    distributeCoins(root) {
        let res = 0;

        const dfs = (cur) => {
            if (!cur) {
                return 0; // extra_coins
            }

            let lExtra = dfs(cur.left);
            let rExtra = dfs(cur.right);

            let extraCoins = cur.val - 1 + lExtra + rExtra;
            res += Math.abs(extraCoins);
            return extraCoins;
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
    private int res;

    public int DistributeCoins(TreeNode root) {
        res = 0;
        Dfs(root);
        return res;
    }

    private int Dfs(TreeNode cur) {
        if (cur == null) {
            return 0; // extra_coins
        }

        int lExtra = Dfs(cur.left);
        int rExtra = Dfs(cur.right);

        int extraCoins = cur.val - 1 + lExtra + rExtra;
        res += Math.Abs(extraCoins);
        return extraCoins;
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
func distributeCoins(root *TreeNode) int {
    res := 0

    var dfs func(cur *TreeNode) int
    dfs = func(cur *TreeNode) int {
        if cur == nil {
            return 0 // extra_coins
        }

        lExtra := dfs(cur.Left)
        rExtra := dfs(cur.Right)

        extraCoins := cur.Val - 1 + lExtra + rExtra
        if extraCoins < 0 {
            res += -extraCoins
        } else {
            res += extraCoins
        }
        return extraCoins
    }

    dfs(root)
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
    private var res = 0

    fun distributeCoins(root: TreeNode?): Int {
        res = 0
        dfs(root)
        return res
    }

    private fun dfs(cur: TreeNode?): Int {
        if (cur == null) {
            return 0 // extra_coins
        }

        val lExtra = dfs(cur.left)
        val rExtra = dfs(cur.right)

        val extraCoins = cur.`val` - 1 + lExtra + rExtra
        res += kotlin.math.abs(extraCoins)
        return extraCoins
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
    private var res = 0

    func distributeCoins(_ root: TreeNode?) -> Int {
        res = 0
        dfs(root)
        return res
    }

    private func dfs(_ cur: TreeNode?) -> Int {
        guard let cur = cur else {
            return 0 // extra_coins
        }

        let lExtra = dfs(cur.left)
        let rExtra = dfs(cur.right)

        let extraCoins = cur.val - 1 + lExtra + rExtra
        res += abs(extraCoins)
        return extraCoins
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ fo recursion stack.

---

## 3. Breadth First Search

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def distributeCoins(self, root: Optional[TreeNode]) -> int:
        res = 0
        q = deque([root])
        parent_map = {}

        nodes = []
        while q:
            node = q.popleft()
            nodes.append(node)
            if node.left:
                parent_map[node.left] = node
                q.append(node.left)
            if node.right:
                parent_map[node.right] = node
                q.append(node.right)

        while nodes:
            node = nodes.pop()
            if node in parent_map:
                parent = parent_map[node]
                parent.val += node.val - 1
                res += abs(node.val - 1)

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
    public int distributeCoins(TreeNode root) {
        int res = 0;
        Queue<TreeNode> q = new LinkedList<>();
        Map<TreeNode, TreeNode> parentMap = new HashMap<>();
        List<TreeNode> nodes = new ArrayList<>();

        q.offer(root);
        while (!q.isEmpty()) {
            TreeNode node = q.poll();
            nodes.add(node);
            if (node.left != null) {
                parentMap.put(node.left, node);
                q.offer(node.left);
            }
            if (node.right != null) {
                parentMap.put(node.right, node);
                q.offer(node.right);
            }
        }

        for (int i = nodes.size() - 1; i >= 0; i--) {
            TreeNode node = nodes.get(i);
            if (parentMap.containsKey(node)) {
                TreeNode parent = parentMap.get(node);
                parent.val += node.val - 1;
                res += Math.abs(node.val - 1);
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
    int distributeCoins(TreeNode* root) {
        int res = 0;
        queue<TreeNode*> q;
        unordered_map<TreeNode*, TreeNode*> parentMap;
        vector<TreeNode*> nodes;

        q.push(root);
        while (!q.empty()) {
            TreeNode* node = q.front();
            q.pop();
            nodes.push_back(node);
            if (node->left) {
                parentMap[node->left] = node;
                q.push(node->left);
            }
            if (node->right) {
                parentMap[node->right] = node;
                q.push(node->right);
            }
        }

        for (int i = nodes.size() - 1; i >= 0; i--) {
            TreeNode* node = nodes[i];
            if (parentMap.count(node)) {
                TreeNode* parent = parentMap[node];
                parent->val += node->val - 1;
                res += abs(node->val - 1);
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
    distributeCoins(root) {
        let res = 0;
        let q = new Queue();
        let parentMap = new Map();
        let nodes = [];

        q.push(root);
        while (!q.isEmpty()) {
            let node = q.pop();
            nodes.push(node);
            if (node.left) {
                parentMap.set(node.left, node);
                q.push(node.left);
            }
            if (node.right) {
                parentMap.set(node.right, node);
                q.push(node.right);
            }
        }

        for (let i = nodes.length - 1; i >= 0; i--) {
            let node = nodes[i];
            if (parentMap.has(node)) {
                let parent = parentMap.get(node);
                parent.val += node.val - 1;
                res += Math.abs(node.val - 1);
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
    public int DistributeCoins(TreeNode root) {
        int res = 0;
        Queue<TreeNode> q = new Queue<TreeNode>();
        Dictionary<TreeNode, TreeNode> parentMap = new Dictionary<TreeNode, TreeNode>();
        List<TreeNode> nodes = new List<TreeNode>();

        q.Enqueue(root);
        while (q.Count > 0) {
            TreeNode node = q.Dequeue();
            nodes.Add(node);
            if (node.left != null) {
                parentMap[node.left] = node;
                q.Enqueue(node.left);
            }
            if (node.right != null) {
                parentMap[node.right] = node;
                q.Enqueue(node.right);
            }
        }

        for (int i = nodes.Count - 1; i >= 0; i--) {
            TreeNode node = nodes[i];
            if (parentMap.ContainsKey(node)) {
                TreeNode parent = parentMap[node];
                parent.val += node.val - 1;
                res += Math.Abs(node.val - 1);
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
func distributeCoins(root *TreeNode) int {
    res := 0
    q := []*TreeNode{root}
    parentMap := make(map[*TreeNode]*TreeNode)
    nodes := []*TreeNode{}

    for len(q) > 0 {
        node := q[0]
        q = q[1:]
        nodes = append(nodes, node)
        if node.Left != nil {
            parentMap[node.Left] = node
            q = append(q, node.Left)
        }
        if node.Right != nil {
            parentMap[node.Right] = node
            q = append(q, node.Right)
        }
    }

    for i := len(nodes) - 1; i >= 0; i-- {
        node := nodes[i]
        if parent, ok := parentMap[node]; ok {
            parent.Val += node.Val - 1
            if node.Val-1 < 0 {
                res += -(node.Val - 1)
            } else {
                res += node.Val - 1
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
    fun distributeCoins(root: TreeNode?): Int {
        var res = 0
        val q: java.util.LinkedList<TreeNode> = java.util.LinkedList()
        val parentMap = HashMap<TreeNode, TreeNode>()
        val nodes = mutableListOf<TreeNode>()

        q.offer(root)
        while (q.isNotEmpty()) {
            val node = q.poll()
            nodes.add(node)
            node.left?.let {
                parentMap[it] = node
                q.offer(it)
            }
            node.right?.let {
                parentMap[it] = node
                q.offer(it)
            }
        }

        for (i in nodes.lastIndex downTo 0) {
            val node = nodes[i]
            parentMap[node]?.let { parent ->
                parent.`val` += node.`val` - 1
                res += kotlin.math.abs(node.`val` - 1)
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
    func distributeCoins(_ root: TreeNode?) -> Int {
        guard let root = root else { return 0 }

        var res = 0
        var q = [TreeNode]()
        var parentMap = [ObjectIdentifier: TreeNode]()
        var nodes = [TreeNode]()

        q.append(root)
        while !q.isEmpty {
            let node = q.removeFirst()
            nodes.append(node)
            if let left = node.left {
                parentMap[ObjectIdentifier(left)] = node
                q.append(left)
            }
            if let right = node.right {
                parentMap[ObjectIdentifier(right)] = node
                q.append(right)
            }
        }

        for i in stride(from: nodes.count - 1, through: 0, by: -1) {
            let node = nodes[i]
            if let parent = parentMap[ObjectIdentifier(node)] {
                parent.val += node.val - 1
                res += abs(node.val - 1)
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

## 4. Iterative DFS

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def distributeCoins(self, root: Optional[TreeNode]) -> int:
        stack = [root]
        res = 0
        visit = set()

        while stack:
            node = stack.pop()

            if node not in visit:
                stack.append(node)
                visit.add(node)

                if node.right:
                    stack.append(node.right)
                if node.left:
                    stack.append(node.left)
            else:
                if node.left:
                    node.val += node.left.val
                if node.right:
                    node.val += node.right.val

                node.val -= 1
                res += abs(node.val)
                visit.remove(node)

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
    public int distributeCoins(TreeNode root) {
        Stack<TreeNode> stack = new Stack<>();
        Set<TreeNode> visit = new HashSet<>();
        stack.push(root);
        int res = 0;

        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();

            if (!visit.contains(node)) {
                stack.push(node);
                visit.add(node);

                if (node.right != null) {
                    stack.push(node.right);
                }
                if (node.left != null) {
                    stack.push(node.left);
                }
            } else {
                if (node.left != null) {
                    node.val += node.left.val;
                }
                if (node.right != null) {
                    node.val += node.right.val;
                }

                node.val -= 1;
                res += Math.abs(node.val);
                visit.remove(node);
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
    int distributeCoins(TreeNode* root) {
        stack<TreeNode*> stack;
        unordered_set<TreeNode*> visit;
        stack.push(root);
        int res = 0;

        while (!stack.empty()) {
            TreeNode* node = stack.top();
            stack.pop();

            if (visit.find(node) == visit.end()) {
                stack.push(node);
                visit.insert(node);

                if (node->right) {
                    stack.push(node->right);
                }
                if (node->left) {
                    stack.push(node->left);
                }
            } else {
                if (node->left) {
                    node->val += node->left->val;
                }
                if (node->right) {
                    node->val += node->right->val;
                }

                visit.erase(node);
                node->val -= 1;
                res += abs(node->val);
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
    distributeCoins(root) {
        let stack = [root];
        let visit = new Set();
        let res = 0;

        while (stack.length) {
            let node = stack.pop();

            if (!visit.has(node)) {
                stack.push(node);
                visit.add(node);

                if (node.right) {
                    stack.push(node.right);
                }
                if (node.left) {
                    stack.push(node.left);
                }
            } else {
                if (node.left) {
                    node.val += node.left.val;
                }
                if (node.right) {
                    node.val += node.right.val;
                }

                visit.delete(node);
                node.val -= 1;
                res += Math.abs(node.val);
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
    public int DistributeCoins(TreeNode root) {
        Stack<TreeNode> stack = new Stack<TreeNode>();
        HashSet<TreeNode> visit = new HashSet<TreeNode>();
        stack.Push(root);
        int res = 0;

        while (stack.Count > 0) {
            TreeNode node = stack.Pop();

            if (!visit.Contains(node)) {
                stack.Push(node);
                visit.Add(node);

                if (node.right != null) {
                    stack.Push(node.right);
                }
                if (node.left != null) {
                    stack.Push(node.left);
                }
            } else {
                if (node.left != null) {
                    node.val += node.left.val;
                }
                if (node.right != null) {
                    node.val += node.right.val;
                }

                node.val -= 1;
                res += Math.Abs(node.val);
                visit.Remove(node);
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
func distributeCoins(root *TreeNode) int {
    stack := []*TreeNode{root}
    visit := make(map[*TreeNode]bool)
    res := 0

    for len(stack) > 0 {
        node := stack[len(stack)-1]
        stack = stack[:len(stack)-1]

        if !visit[node] {
            stack = append(stack, node)
            visit[node] = true

            if node.Right != nil {
                stack = append(stack, node.Right)
            }
            if node.Left != nil {
                stack = append(stack, node.Left)
            }
        } else {
            if node.Left != nil {
                node.Val += node.Left.Val
            }
            if node.Right != nil {
                node.Val += node.Right.Val
            }

            delete(visit, node)
            node.Val -= 1
            if node.Val < 0 {
                res += -node.Val
            } else {
                res += node.Val
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
    fun distributeCoins(root: TreeNode?): Int {
        val stack = ArrayDeque<TreeNode>()
        val visit = HashSet<TreeNode>()
        stack.addLast(root!!)
        var res = 0

        while (stack.isNotEmpty()) {
            val node = stack.removeLast()

            if (node !in visit) {
                stack.addLast(node)
                visit.add(node)

                node.right?.let { stack.addLast(it) }
                node.left?.let { stack.addLast(it) }
            } else {
                node.left?.let { node.`val` += it.`val` }
                node.right?.let { node.`val` += it.`val` }

                visit.remove(node)
                node.`val` -= 1
                res += kotlin.math.abs(node.`val`)
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
    func distributeCoins(_ root: TreeNode?) -> Int {
        guard let root = root else { return 0 }

        var stack = [root]
        var visit = Set<ObjectIdentifier>()
        var res = 0

        while !stack.isEmpty {
            let node = stack.removeLast()
            let nodeId = ObjectIdentifier(node)

            if !visit.contains(nodeId) {
                stack.append(node)
                visit.insert(nodeId)

                if let right = node.right {
                    stack.append(right)
                }
                if let left = node.left {
                    stack.append(left)
                }
            } else {
                if let left = node.left {
                    node.val += left.val
                }
                if let right = node.right {
                    node.val += right.val
                }

                visit.remove(nodeId)
                node.val -= 1
                res += abs(node.val)
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
