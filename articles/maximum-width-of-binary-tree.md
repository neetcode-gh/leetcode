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
    def widthOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        res = 0
        q = deque([(root, 1, 0)])  # [node, num, level]
        prevLevel, prevNum = 0, 1

        while q:
            node, num, level = q.popleft()

            if level > prevLevel:
                prevLevel = level
                prevNum = num

            res = max(res, num - prevNum + 1)
            if node.left:
                q.append((node.left, 2 * num, level + 1))
            if node.right:
                q.append((node.right, 2 * num + 1, level + 1))

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
    public int widthOfBinaryTree(TreeNode root) {
        if (root == null) return 0;

        int res = 0;
        Queue<Tuple> queue = new LinkedList<>();
        queue.offer(new Tuple(root, 1, 0)); // [node, num, level]
        int prevLevel = 0, prevNum = 1;

        while (!queue.isEmpty()) {
            Tuple current = queue.poll();
            TreeNode node = current.node;
            int num = current.num;
            int level = current.level;

            if (level > prevLevel) {
                prevLevel = level;
                prevNum = num;
            }

            res = Math.max(res, num - prevNum + 1);
            if (node.left != null) {
                queue.offer(new Tuple(node.left, 2 * num, level + 1));
            }
            if (node.right != null) {
                queue.offer(new Tuple(node.right, 2 * num + 1, level + 1));
            }
        }

        return res;
    }

    class Tuple {
        TreeNode node;
        int num, level;

        Tuple(TreeNode node, int num, int level) {
            this.node = node;
            this.num = num;
            this.level = level;
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
    int widthOfBinaryTree(TreeNode* root) {
        if (!root) return 0;

        int res = 0;
        queue<tuple<TreeNode*, uint, int>> q; // [node, num, level]
        q.push({root, 1, 0});
        int prevLevel = 0, prevNum = 1;

        while (!q.empty()) {
            auto [node, num, level] = q.front();
            q.pop();

            if (level > prevLevel) {
                prevLevel = level;
                prevNum = num;
            }

            res = max(res, int(num - prevNum) + 1);
            if (node->left) {
                q.push({node->left, 2 * num, level + 1});
            }
            if (node->right) {
                q.push({node->right, 2 * num + 1, level + 1});
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
    widthOfBinaryTree(root) {
        if (!root) return 0;

        let res = 0n;
        const queue = new Queue([[root, 1n, 0]]); // [node, num, level]
        let prevLevel = 0,
            prevNum = 1n;

        while (!queue.isEmpty()) {
            const [node, num, level] = queue.pop();

            if (level > prevLevel) {
                prevLevel = level;
                prevNum = num;
            }

            res = res > num - prevNum + 1n ? res : num - prevNum + 1n;
            if (node.left) {
                queue.push([node.left, 2n * num, level + 1]);
            }
            if (node.right) {
                queue.push([node.right, 2n * num + 1n, level + 1]);
            }
        }

        return Number(res);
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
func widthOfBinaryTree(root *TreeNode) int {
    if root == nil {
        return 0
    }

    res := 0
    type item struct {
        node  *TreeNode
        num   uint64
        level int
    }
    queue := []item{{root, 1, 0}}
    prevLevel := 0
    var prevNum uint64 = 1

    for len(queue) > 0 {
        cur := queue[0]
        queue = queue[1:]
        node, num, level := cur.node, cur.num, cur.level

        if level > prevLevel {
            prevLevel = level
            prevNum = num
        }

        width := int(num - prevNum + 1)
        if width > res {
            res = width
        }
        if node.Left != nil {
            queue = append(queue, item{node.Left, 2 * num, level + 1})
        }
        if node.Right != nil {
            queue = append(queue, item{node.Right, 2*num + 1, level + 1})
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
    fun widthOfBinaryTree(root: TreeNode?): Int {
        if (root == null) return 0

        var res = 0
        val queue = ArrayDeque<Triple<TreeNode, Long, Int>>()
        queue.add(Triple(root, 1L, 0))
        var prevLevel = 0
        var prevNum = 1L

        while (queue.isNotEmpty()) {
            val (node, num, level) = queue.removeFirst()

            if (level > prevLevel) {
                prevLevel = level
                prevNum = num
            }

            res = maxOf(res, (num - prevNum + 1).toInt())
            node.left?.let { queue.add(Triple(it, 2 * num, level + 1)) }
            node.right?.let { queue.add(Triple(it, 2 * num + 1, level + 1)) }
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
    func widthOfBinaryTree(_ root: TreeNode?) -> Int {
        guard let root = root else { return 0 }

        var res = 0
        var queue: [(TreeNode, UInt64, Int)] = [(root, 1, 0)]
        var prevLevel = 0
        var prevNum: UInt64 = 1

        while !queue.isEmpty {
            let (node, num, level) = queue.removeFirst()

            if level > prevLevel {
                prevLevel = level
                prevNum = num
            }

            res = max(res, Int(num - prevNum + 1))
            if let left = node.left {
                queue.append((left, 2 * num, level + 1))
            }
            if let right = node.right {
                queue.append((right, 2 * num + 1, level + 1))
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

## 2. Breadth First Search (Optimal)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def widthOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        res = 0
        q = deque([(root, 0)])

        while q:
            start = q[0][1]
            for _ in range(len(q)):
                node, num = q.popleft()
                curNum = num - start
                res = max(res, curNum + 1)
                if node.left:
                    q.append((node.left, 2 * curNum))
                if node.right:
                    q.append((node.right, 2 * curNum + 1))

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
    public int widthOfBinaryTree(TreeNode root) {
        int res = 0;
        Queue<Pair<TreeNode, Integer>> q = new LinkedList<>();
        q.offer(new Pair<>(root, 0));

        while (!q.isEmpty()) {
            int start = q.peek().getValue();
            for (int i = q.size(); i > 0; i--) {
                Pair<TreeNode, Integer> pair = q.poll();
                TreeNode node = pair.getKey();
                int num = pair.getValue() - start;

                res = Math.max(res, num + 1);
                if (node.left != null) {
                    q.offer(new Pair<>(node.left, 2 * num));
                }
                if (node.right != null) {
                    q.offer(new Pair<>(node.right, 2 * num + 1));
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
    int widthOfBinaryTree(TreeNode* root) {
        int res = 0;
        queue<pair<TreeNode*, uint>> q;
        q.push({root, 0});

        while (!q.empty()) {
            int start = q.front().second;

            for (int i = q.size(); i > 0; --i) {
                auto [node, num] = q.front();
                q.pop();
                uint curNum = num - start;
                res = max(res, int(curNum) + 1);
                if (node->left) {
                    q.push({node->left, 2 * curNum});
                }
                if (node->right) {
                    q.push({node->right, 2 * curNum + 1});
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
    widthOfBinaryTree(root) {
        let res = 0;
        const q = new Queue([[root, 0]]);

        while (!q.isEmpty()) {
            const start = q.front()[1];

            for (let i = q.size(); i > 0; i--) {
                const [node, num] = q.pop();
                const curNum = num - start;
                res = Math.max(res, curNum + 1);
                if (node.left) {
                    q.push([node.left, 2 * curNum]);
                }
                if (node.right) {
                    q.push([node.right, 2 * curNum + 1]);
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
func widthOfBinaryTree(root *TreeNode) int {
    res := 0
    type item struct {
        node *TreeNode
        num  uint
    }
    queue := []item{{root, 0}}

    for len(queue) > 0 {
        start := queue[0].num
        size := len(queue)

        for i := 0; i < size; i++ {
            cur := queue[0]
            queue = queue[1:]
            curNum := cur.num - start
            if int(curNum)+1 > res {
                res = int(curNum) + 1
            }
            if cur.node.Left != nil {
                queue = append(queue, item{cur.node.Left, 2 * curNum})
            }
            if cur.node.Right != nil {
                queue = append(queue, item{cur.node.Right, 2*curNum + 1})
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
    fun widthOfBinaryTree(root: TreeNode?): Int {
        var res = 0
        val queue = ArrayDeque<Pair<TreeNode, Int>>()
        queue.add(root!! to 0)

        while (queue.isNotEmpty()) {
            val start = queue.first().second
            val size = queue.size

            repeat(size) {
                val (node, num) = queue.removeFirst()
                val curNum = num - start
                res = maxOf(res, curNum + 1)
                node.left?.let { queue.add(it to 2 * curNum) }
                node.right?.let { queue.add(it to 2 * curNum + 1) }
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
    func widthOfBinaryTree(_ root: TreeNode?) -> Int {
        guard let root = root else { return 0 }

        var res = 0
        var queue: [(TreeNode, Int)] = [(root, 0)]

        while !queue.isEmpty {
            let start = queue.first!.1
            let size = queue.count

            for _ in 0..<size {
                let (node, num) = queue.removeFirst()
                let curNum = num - start
                res = max(res, curNum + 1)
                if let left = node.left {
                    queue.append((left, 2 * curNum))
                }
                if let right = node.right {
                    queue.append((right, 2 * curNum + 1))
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
- Space complexity: $O(n)$

---

## 3. Depth First Search

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def widthOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        first = {}
        res = 0

        def dfs(node, level, num):
            nonlocal res
            if not node:
                return

            if level not in first:
                first[level] = num

            res = max(res, num - first[level] + 1)
            dfs(node.left, level + 1, 2 * num)
            dfs(node.right, level + 1, 2 * num + 1)

        dfs(root, 0, 0)
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
    private Map<Integer, Integer> first;
    public int widthOfBinaryTree(TreeNode root) {
        first = new HashMap<>();
        int[] res = new int[1];

        dfs(root, 0, 0, res);
        return res[0];
    }

    private void dfs(TreeNode node, int level, int num, int[] res) {
        if (node == null) {
            return;
        }

        first.putIfAbsent(level, num);
        res[0] = Math.max(res[0], num - first.get(level) + 1);
        dfs(node.left, level + 1, 2 * num, res);
        dfs(node.right, level + 1, 2 * num + 1, res);
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
    unordered_map<int, unsigned long long> first;

public:
    int widthOfBinaryTree(TreeNode* root) {
        unsigned long long res = 0;

        dfs(root, 0, 0, res);
        return int(res);
    }

private:
    void dfs(TreeNode* node, int level, unsigned long long num, unsigned long long& res) {
        if (!node) {
            return;
        }

        if (!first.count(level)) {
            first[level] = num;
        }

        res = max(res, num - first[level] + 1);
        dfs(node->left, level + 1, 2 * (num - first[level]), res);
        dfs(node->right, level + 1, 2 * (num - first[level]) + 1, res);
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
    widthOfBinaryTree(root) {
        const first = new Map();
        let res = 0;

        const dfs = (node, level, curNum) => {
            if (!node) return;

            if (!first.has(level)) {
                first.set(level, curNum);
            }

            res = Math.max(res, curNum - first.get(level) + 1);
            dfs(node.left, level + 1, 2 * (curNum - first.get(level)));
            dfs(node.right, level + 1, 2 * (curNum - first.get(level)) + 1);
        };

        dfs(root, 0, 0);
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
func widthOfBinaryTree(root *TreeNode) int {
    first := make(map[int]int)
    res := 0

    var dfs func(node *TreeNode, level, curNum int)
    dfs = func(node *TreeNode, level, curNum int) {
        if node == nil {
            return
        }

        if _, ok := first[level]; !ok {
            first[level] = curNum
        }

        width := curNum - first[level] + 1
        if width > res {
            res = width
        }
        dfs(node.Left, level+1, 2*(curNum-first[level]))
        dfs(node.Right, level+1, 2*(curNum-first[level])+1)
    }

    dfs(root, 0, 0)
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
    private val first = mutableMapOf<Int, Int>()
    private var res = 0

    fun widthOfBinaryTree(root: TreeNode?): Int {
        first.clear()
        res = 0
        dfs(root, 0, 0)
        return res
    }

    private fun dfs(node: TreeNode?, level: Int, curNum: Int) {
        if (node == null) return

        if (level !in first) {
            first[level] = curNum
        }

        res = maxOf(res, curNum - first[level]!! + 1)
        dfs(node.left, level + 1, 2 * (curNum - first[level]!!))
        dfs(node.right, level + 1, 2 * (curNum - first[level]!!) + 1)
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
    private var first = [Int: Int]()
    private var res = 0

    func widthOfBinaryTree(_ root: TreeNode?) -> Int {
        first = [:]
        res = 0
        dfs(root, 0, 0)
        return res
    }

    private func dfs(_ node: TreeNode?, _ level: Int, _ curNum: Int) {
        guard let node = node else { return }

        if first[level] == nil {
            first[level] = curNum
        }

        res = max(res, curNum - first[level]! + 1)
        dfs(node.left, level + 1, 2 * (curNum - first[level]!))
        dfs(node.right, level + 1, 2 * (curNum - first[level]!) + 1)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
