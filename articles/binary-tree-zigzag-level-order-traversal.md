## 1. Breadth First Search

### Intuition
Level order traversal naturally suggests using BFS with a queue. The zigzag pattern means we alternate the direction we read each level: left-to-right for even levels, right-to-left for odd levels. We can achieve this by collecting each level normally and then reversing it when needed based on the level index.

### Algorithm
1. Initialize an empty result list and a queue with the root node.
2. While the queue is not empty:
   - Create an empty list to store the current level's values.
   - Process all nodes at the current level by iterating through the queue's current size.
   - For each node, add its value to the level list and enqueue its children (left then right).
   - If the current level index is odd, reverse the level list.
   - Add the level list to the result.
3. Return the result list.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def zigzagLevelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        res = []
        q = deque([root] if root else [])
        while q:
            level = []
            for i in range(len(q)):
                node = q.popleft()
                level.append(node.val)
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
            if len(res) % 2:
                level.reverse()
            res.append(level)
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
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;

        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);

        while (!q.isEmpty()) {
            List<Integer> level = new ArrayList<>();
            for (int i = q.size(); i > 0; i--) {
                TreeNode node = q.poll();
                level.add(node.val);
                if (node.left != null) q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
            if (res.size() % 2 != 0) Collections.reverse(level);
            res.add(level);
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
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        vector<vector<int>> res;
        if (!root) return res;

        queue<TreeNode*> q;
        q.push(root);

        while (!q.empty()) {
            vector<int> level;
            for (int i = q.size(); i > 0; i--) {
                TreeNode* node = q.front();
                q.pop();
                level.push_back(node->val);
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            if (res.size() % 2) reverse(level.begin(), level.end());
            res.push_back(level);
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
     * @return {number[][]}
     */
    zigzagLevelOrder(root) {
        const res = [];
        if (!root) return res;

        const queue = new Queue([root]);

        while (!queue.isEmpty()) {
            const level = [];
            for (let i = queue.size(); i > 0; i--) {
                const node = queue.pop();
                level.push(node.val);
                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
            }
            if (res.length % 2 !== 0) level.reverse();
            res.push(level);
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
    public List<List<int>> ZigzagLevelOrder(TreeNode root) {
        var res = new List<List<int>>();
        if (root == null) return res;

        var q = new Queue<TreeNode>();
        q.Enqueue(root);

        while (q.Count > 0) {
            int size = q.Count;
            var level = new List<int>();

            for (int i = 0; i < size; i++) {
                var node = q.Dequeue();
                level.Add(node.val);

                if (node.left != null) q.Enqueue(node.left);
                if (node.right != null) q.Enqueue(node.right);
            }

            if (res.Count % 2 == 1) level.Reverse();
            res.Add(level);
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
func zigzagLevelOrder(root *TreeNode) [][]int {
    res := [][]int{}
    if root == nil {
        return res
    }

    q := []*TreeNode{root}

    for len(q) > 0 {
        level := []int{}
        size := len(q)

        for i := 0; i < size; i++ {
            node := q[0]
            q = q[1:]
            level = append(level, node.Val)
            if node.Left != nil {
                q = append(q, node.Left)
            }
            if node.Right != nil {
                q = append(q, node.Right)
            }
        }

        if len(res)%2 == 1 {
            for i, j := 0, len(level)-1; i < j; i, j = i+1, j-1 {
                level[i], level[j] = level[j], level[i]
            }
        }
        res = append(res, level)
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
    fun zigzagLevelOrder(root: TreeNode?): List<List<Int>> {
        val res = mutableListOf<List<Int>>()
        if (root == null) return res

        val q = ArrayDeque<TreeNode>()
        q.add(root)

        while (q.isNotEmpty()) {
            val level = mutableListOf<Int>()
            val size = q.size

            repeat(size) {
                val node = q.removeFirst()
                level.add(node.`val`)
                node.left?.let { q.add(it) }
                node.right?.let { q.add(it) }
            }

            if (res.size % 2 == 1) level.reverse()
            res.add(level)
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
    func zigzagLevelOrder(_ root: TreeNode?) -> [[Int]] {
        var res = [[Int]]()
        guard let root = root else { return res }

        var q = [root]

        while !q.isEmpty {
            var level = [Int]()
            let size = q.count

            for _ in 0..<size {
                let node = q.removeFirst()
                level.append(node.val)
                if let left = node.left {
                    q.append(left)
                }
                if let right = node.right {
                    q.append(right)
                }
            }

            if res.count % 2 == 1 {
                level.reverse()
            }
            res.append(level)
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

## 2. Breadth First Search (Optimal)

### Intuition
Instead of reversing the list after collecting values, we can place each value directly at its correct position. For even levels, values go from index 0 to size-1. For odd levels, values go from index size-1 to 0. This avoids the extra reversal operation.

### Algorithm
1. Initialize an empty result list and a queue with the root node.
2. While the queue is not empty:
   - Get the current level size and create a fixed-size array for this level.
   - For each node in the current level:
     - Calculate the insertion index: for even levels use the iteration index, for odd levels use (size - 1 - iteration index).
     - Place the node's value at the calculated index.
     - Enqueue the node's children.
   - Add the level array to the result.
3. Return the result list.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def zigzagLevelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        res = []
        q = deque([root] if root else [])
        while q:
            size = len(q)
            level = [0] * size
            for i in range(size):
                node = q.popleft()
                idx = size - i - 1 if len(res) % 2 else i
                level[idx] = node.val
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
            res.append(level)
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
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;

        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);

        while (!q.isEmpty()) {
            int size = q.size();
            Integer[] level = new Integer[size];
            for (int i = 0; i < size; i++) {
                TreeNode node = q.poll();
                int idx = (res.size() % 2 == 0) ? i : size - i - 1;
                level[idx] = node.val;
                if (node.left != null) q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
            res.add(Arrays.asList(level));
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
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        vector<vector<int>> res;
        if (!root) return res;

        queue<TreeNode*> q;
        q.push(root);

        while (!q.empty()) {
            int size = q.size();
            vector<int> level(size);
            for (int i = 0; i < size; ++i) {
                TreeNode* node = q.front();
                q.pop();
                int idx = (res.size() % 2 == 0) ? i : size - i - 1;
                level[idx] = node->val;
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            res.push_back(level);
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
     * @return {number[][]}
     */
    zigzagLevelOrder(root) {
        const res = [];
        if (!root) return res;

        const q = new Queue([root]);

        while (!q.isEmpty()) {
            const size = q.size();
            const level = Array(size).fill(0);

            for (let i = 0; i < size; i++) {
                const node = q.pop();
                const idx = res.length % 2 === 0 ? i : size - i - 1;
                level[idx] = node.val;
                if (node.left) q.push(node.left);
                if (node.right) q.push(node.right);
            }
            res.push(level);
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
    public List<List<int>> ZigzagLevelOrder(TreeNode root) {
        var res = new List<List<int>>();
        if (root == null) return res;

        var q = new Queue<TreeNode>();
        q.Enqueue(root);

        while (q.Count > 0) {
            int size = q.Count;
            var level = new int[size];
            for (int i = 0; i < size; i++) {
                var node = q.Dequeue();
                int idx = (res.Count % 2 == 1) ? size - i - 1 : i;
                level[idx] = node.val;
                if (node.left != null) q.Enqueue(node.left);
                if (node.right != null) q.Enqueue(node.right);
            }
            res.Add(level.ToList());
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
func zigzagLevelOrder(root *TreeNode) [][]int {
    res := [][]int{}
    if root == nil {
        return res
    }

    q := []*TreeNode{root}

    for len(q) > 0 {
        size := len(q)
        level := make([]int, size)

        for i := 0; i < size; i++ {
            node := q[0]
            q = q[1:]
            idx := i
            if len(res)%2 == 1 {
                idx = size - i - 1
            }
            level[idx] = node.Val
            if node.Left != nil {
                q = append(q, node.Left)
            }
            if node.Right != nil {
                q = append(q, node.Right)
            }
        }

        res = append(res, level)
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
    fun zigzagLevelOrder(root: TreeNode?): List<List<Int>> {
        val res = mutableListOf<List<Int>>()
        if (root == null) return res

        val q = ArrayDeque<TreeNode>()
        q.add(root)

        while (q.isNotEmpty()) {
            val size = q.size
            val level = IntArray(size)

            for (i in 0 until size) {
                val node = q.removeFirst()
                val idx = if (res.size % 2 == 0) i else size - i - 1
                level[idx] = node.`val`
                node.left?.let { q.add(it) }
                node.right?.let { q.add(it) }
            }

            res.add(level.toList())
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
    func zigzagLevelOrder(_ root: TreeNode?) -> [[Int]] {
        var res = [[Int]]()
        guard let root = root else { return res }

        var q = [root]

        while !q.isEmpty {
            let size = q.count
            var level = [Int](repeating: 0, count: size)

            for i in 0..<size {
                let node = q.removeFirst()
                let idx = res.count % 2 == 0 ? i : size - i - 1
                level[idx] = node.val
                if let left = node.left {
                    q.append(left)
                }
                if let right = node.right {
                    q.append(right)
                }
            }

            res.append(level)
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

## 3. Depth First Search

### Intuition
DFS can also solve this problem by tracking the depth during traversal. We recursively visit nodes in a standard preorder manner (root, left, right), appending values to the appropriate level's list. After the traversal completes, we reverse the odd-indexed levels to achieve the zigzag pattern.

### Algorithm
1. Create an empty result list.
2. Define a recursive DFS function that takes a node and its depth:
   - If the node is null, return.
   - If this is the first node at this depth, create a new list for this level.
   - Append the node's value to the list at the current depth.
   - Recursively process the left child with depth + 1.
   - Recursively process the right child with depth + 1.
3. Call DFS starting from the root at depth 0.
4. Reverse all lists at odd indices.
5. Return the result list.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def zigzagLevelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        res = []

        def dfs(node, depth):
            if not node:
                return
            if depth == len(res):
                res.append([])
            res[depth].append(node.val)
            dfs(node.left, depth + 1)
            dfs(node.right, depth + 1)

        dfs(root, 0)
        for i, level in enumerate(res):
            if i & 1:
                level.reverse()

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
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        dfs(root, 0, res);
        for (int i = 0; i < res.size(); i++) {
            if ((i & 1) == 1) {
                Collections.reverse(res.get(i));
            }
        }
        return res;
    }

    private void dfs(TreeNode node, int depth, List<List<Integer>> res) {
        if (node == null) return;
        if (depth == res.size()) {
            res.add(new ArrayList<>());
        }
        res.get(depth).add(node.val);
        dfs(node.left, depth + 1, res);
        dfs(node.right, depth + 1, res);
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
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        vector<vector<int>> res;
        dfs(root, 0, res);
        for (int i = 0; i < res.size(); ++i) {
            if (i & 1) {
                reverse(res[i].begin(), res[i].end());
            }
        }
        return res;
    }

private:
    void dfs(TreeNode* node, int depth, vector<vector<int>>& res) {
        if (!node) return;
        if (depth == res.size()) {
            res.push_back({});
        }
        res[depth].push_back(node->val);
        dfs(node->left, depth + 1, res);
        dfs(node->right, depth + 1, res);
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
     * @return {number[][]}
     */
    zigzagLevelOrder(root) {
        const res = [];
        const dfs = (node, depth) => {
            if (!node) return;
            if (depth === res.length) res.push([]);
            res[depth].push(node.val);
            dfs(node.left, depth + 1);
            dfs(node.right, depth + 1);
        };

        dfs(root, 0);
        for (let i = 0; i < res.length; i++) {
            if (i % 2 === 1) res[i].reverse();
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
    public List<List<int>> ZigzagLevelOrder(TreeNode root) {
        var res = new List<List<int>>();

        void Dfs(TreeNode node, int depth) {
            if (node == null) return;
            if (depth == res.Count) {
                res.Add(new List<int>());
            }
            res[depth].Add(node.val);
            Dfs(node.left, depth + 1);
            Dfs(node.right, depth + 1);
        }

        Dfs(root, 0);

        for (int i = 0; i < res.Count; i++) {
            if ((i & 1) == 1) {
                var level = res[i];
                int l = 0, r = level.Count - 1;
                while (l < r) {
                    int temp = level[l];
                    level[l] = level[r];
                    level[r] = temp;
                    l++;
                    r--;
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
func zigzagLevelOrder(root *TreeNode) [][]int {
    res := [][]int{}

    var dfs func(node *TreeNode, depth int)
    dfs = func(node *TreeNode, depth int) {
        if node == nil {
            return
        }
        if depth == len(res) {
            res = append(res, []int{})
        }
        res[depth] = append(res[depth], node.Val)
        dfs(node.Left, depth+1)
        dfs(node.Right, depth+1)
    }

    dfs(root, 0)

    for i := range res {
        if i%2 == 1 {
            level := res[i]
            for l, r := 0, len(level)-1; l < r; l, r = l+1, r-1 {
                level[l], level[r] = level[r], level[l]
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
    fun zigzagLevelOrder(root: TreeNode?): List<List<Int>> {
        val res = mutableListOf<MutableList<Int>>()

        fun dfs(node: TreeNode?, depth: Int) {
            if (node == null) return
            if (depth == res.size) {
                res.add(mutableListOf())
            }
            res[depth].add(node.`val`)
            dfs(node.left, depth + 1)
            dfs(node.right, depth + 1)
        }

        dfs(root, 0)

        for (i in res.indices) {
            if (i and 1 == 1) {
                res[i].reverse()
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
    func zigzagLevelOrder(_ root: TreeNode?) -> [[Int]] {
        var res = [[Int]]()

        func dfs(_ node: TreeNode?, _ depth: Int) {
            guard let node = node else { return }
            if depth == res.count {
                res.append([])
            }
            res[depth].append(node.val)
            dfs(node.left, depth + 1)
            dfs(node.right, depth + 1)
        }

        dfs(root, 0)

        for i in 0..<res.count {
            if i % 2 == 1 {
                res[i].reverse()
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

### Intuition
This approach converts the recursive DFS to an iterative version using an explicit stack. Each stack entry stores both the node and its depth. We process nodes in the same order as recursive DFS by pushing the right child before the left child (so left is processed first). After collecting all values, we reverse the odd levels.

### Algorithm
1. If the root is null, return an empty list.
2. Initialize a stack with the root node and depth 0.
3. While the stack is not empty:
   - Pop a node and its depth.
   - If this depth is new, create a new list for it.
   - Append the node's value to the list at this depth.
   - Push the right child (if exists) with depth + 1.
   - Push the left child (if exists) with depth + 1.
4. Reverse all lists at odd indices.
5. Return the result list.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def zigzagLevelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root:
            return []

        res = []
        stack = [(root, 0)]

        while stack:
            node, depth = stack.pop()
            if depth == len(res):
                res.append([])

            res[depth].append(node.val)

            if node.right:
                stack.append((node.right, depth + 1))
            if node.left:
                stack.append((node.left, depth + 1))

        for i in range(len(res)):
            if i % 2 == 1:
                res[i].reverse()

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
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        if (root == null) return new ArrayList<>();

        List<List<Integer>> res = new ArrayList<>();
        Stack<Pair> stack = new Stack<>();
        stack.push(new Pair(root, 0));

        while (!stack.isEmpty()) {
            Pair<TreeNode, Integer> current = stack.pop();
            TreeNode node = current.getKey();
            int depth = current.getValue();

            if (depth == res.size()) {
                res.add(new ArrayList<>());
            }
            res.get(depth).add(node.val);

            if (node.right != null) stack.push(new Pair<>(node.right, depth + 1));
            if (node.left != null) stack.push(new Pair<>(node.left, depth + 1));
        }

        for (int i = 0; i < res.size(); i++) {
            if (i % 2 == 1) {
                Collections.reverse(res.get(i));
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
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        if (!root) return {};

        vector<vector<int>> res;
        stack<pair<TreeNode*, int>> s;
        s.push({root, 0});

        while (!s.empty()) {
            auto [node, depth] = s.top();
            s.pop();

            if (depth == res.size()) {
                res.push_back({});
            }
            res[depth].push_back(node->val);

            if (node->right) s.push({node->right, depth + 1});
            if (node->left) s.push({node->left, depth + 1});
        }

        for (int i = 0; i < res.size(); i++) {
            if (i % 2 == 1) {
                reverse(res[i].begin(), res[i].end());
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
     * @return {number[][]}
     */
    zigzagLevelOrder(root) {
        if (!root) return [];

        const res = [];
        const stack = [[root, 0]];

        while (stack.length) {
            const [node, depth] = stack.pop();

            if (depth === res.length) res.push([]);
            res[depth].push(node.val);

            if (node.right) stack.push([node.right, depth + 1]);
            if (node.left) stack.push([node.left, depth + 1]);
        }

        for (let i = 0; i < res.length; i++) {
            if (i % 2 === 1) res[i].reverse();
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
    public List<List<int>> ZigzagLevelOrder(TreeNode root) {
        if (root == null) return new List<List<int>>();

        var res = new List<List<int>>();
        var stack = new Stack<(TreeNode, int)>();
        stack.Push((root, 0));

        while (stack.Count > 0) {
            var (node, depth) = stack.Pop();
            if (depth == res.Count) {
                res.Add(new List<int>());
            }
            res[depth].Add(node.val);

            if (node.right != null) {
                stack.Push((node.right, depth + 1));
            }
            if (node.left != null) {
                stack.Push((node.left, depth + 1));
            }
        }

        for (int i = 0; i < res.Count; i++) {
            if ((i % 2) == 1) {
                var level = res[i];
                int l = 0, r = level.Count - 1;
                while (l < r) {
                    int temp = level[l];
                    level[l] = level[r];
                    level[r] = temp;
                    l++;
                    r--;
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
func zigzagLevelOrder(root *TreeNode) [][]int {
    if root == nil {
        return [][]int{}
    }

    res := [][]int{}
    stack := []struct {
        node  *TreeNode
        depth int
    }{{root, 0}}

    for len(stack) > 0 {
        top := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        node, depth := top.node, top.depth

        if depth == len(res) {
            res = append(res, []int{})
        }
        res[depth] = append(res[depth], node.Val)

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

    for i := range res {
        if i%2 == 1 {
            level := res[i]
            for l, r := 0, len(level)-1; l < r; l, r = l+1, r-1 {
                level[l], level[r] = level[r], level[l]
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
    fun zigzagLevelOrder(root: TreeNode?): List<List<Int>> {
        if (root == null) return emptyList()

        val res = mutableListOf<MutableList<Int>>()
        val stack = ArrayDeque<Pair<TreeNode, Int>>()
        stack.addLast(root to 0)

        while (stack.isNotEmpty()) {
            val (node, depth) = stack.removeLast()
            if (depth == res.size) {
                res.add(mutableListOf())
            }
            res[depth].add(node.`val`)

            node.right?.let { stack.addLast(it to depth + 1) }
            node.left?.let { stack.addLast(it to depth + 1) }
        }

        for (i in res.indices) {
            if (i % 2 == 1) {
                res[i].reverse()
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
    func zigzagLevelOrder(_ root: TreeNode?) -> [[Int]] {
        guard let root = root else { return [] }

        var res = [[Int]]()
        var stack: [(TreeNode, Int)] = [(root, 0)]

        while !stack.isEmpty {
            let (node, depth) = stack.removeLast()
            if depth == res.count {
                res.append([])
            }
            res[depth].append(node.val)

            if let right = node.right {
                stack.append((right, depth + 1))
            }
            if let left = node.left {
                stack.append((left, depth + 1))
            }
        }

        for i in 0..<res.count {
            if i % 2 == 1 {
                res[i].reverse()
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
