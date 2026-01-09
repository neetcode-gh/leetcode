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
    def generateTrees(self, n: int) -> List[Optional[TreeNode]]:
        def generate(left, right):
            if left > right:
                return [None]

            res = []
            for val in range(left, right + 1):
                for leftTree in generate(left, val - 1):
                    for rightTree in generate(val + 1, right):
                        root = TreeNode(val, leftTree, rightTree)
                        res.append(root)
            return res

        return generate(1, n)
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
    public List<TreeNode> generateTrees(int n) {
        return generate(1, n);
    }

    private List<TreeNode> generate(int left, int right) {
        List<TreeNode> res = new ArrayList<>();
        if (left > right) {
            res.add(null);
            return res;
        }

        for (int val = left; val <= right; val++) {
            List<TreeNode> leftTrees = generate(left, val - 1);
            List<TreeNode> rightTrees = generate(val + 1, right);

            for (TreeNode leftTree : leftTrees) {
                for (TreeNode rightTree : rightTrees) {
                    res.add(new TreeNode(val, leftTree, rightTree));
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
    vector<TreeNode*> generateTrees(int n) {
        return generate(1, n);
    }

private:
    vector<TreeNode*> generate(int left, int right) {
        if (left > right) return {nullptr};

        vector<TreeNode*> res;
        for (int val = left; val <= right; val++) {
            vector<TreeNode*> leftTrees = generate(left, val - 1);
            vector<TreeNode*> rightTrees = generate(val + 1, right);

            for (auto& leftTree : leftTrees) {
                for (auto& rightTree : rightTrees) {
                    res.push_back(new TreeNode(val, leftTree, rightTree));
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
     * @param {number} n
     * @return {TreeNode[]}
     */
    generateTrees(n) {
        const generate = (left, right) => {
            if (left > right) return [null];

            let res = [];
            for (let val = left; val <= right; val++) {
                let leftTrees = generate(left, val - 1);
                let rightTrees = generate(val + 1, right);

                for (let leftTree of leftTrees) {
                    for (let rightTree of rightTrees) {
                        res.push(new TreeNode(val, leftTree, rightTree));
                    }
                }
            }
            return res;
        };

        return generate(1, n);
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
    public IList<TreeNode> GenerateTrees(int n) {
        return Generate(1, n);
    }

    private IList<TreeNode> Generate(int left, int right) {
        var res = new List<TreeNode>();
        if (left > right) {
            res.Add(null);
            return res;
        }

        for (int val = left; val <= right; val++) {
            var leftTrees = Generate(left, val - 1);
            var rightTrees = Generate(val + 1, right);

            foreach (var leftTree in leftTrees) {
                foreach (var rightTree in rightTrees) {
                    res.Add(new TreeNode(val, leftTree, rightTree));
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
func generateTrees(n int) []*TreeNode {
    var generate func(left, right int) []*TreeNode
    generate = func(left, right int) []*TreeNode {
        if left > right {
            return []*TreeNode{nil}
        }

        var res []*TreeNode
        for val := left; val <= right; val++ {
            leftTrees := generate(left, val-1)
            rightTrees := generate(val+1, right)

            for _, leftTree := range leftTrees {
                for _, rightTree := range rightTrees {
                    res = append(res, &TreeNode{val, leftTree, rightTree})
                }
            }
        }
        return res
    }
    return generate(1, n)
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
    fun generateTrees(n: Int): List<TreeNode?> {
        fun generate(left: Int, right: Int): List<TreeNode?> {
            if (left > right) return listOf(null)

            val res = mutableListOf<TreeNode?>()
            for (v in left..right) {
                val leftTrees = generate(left, v - 1)
                val rightTrees = generate(v + 1, right)

                for (leftTree in leftTrees) {
                    for (rightTree in rightTrees) {
                        res.add(TreeNode(v).apply {
                            this.left = leftTree
                            this.right = rightTree
                        })
                    }
                }
            }
            return res
        }
        return generate(1, n)
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
    func generateTrees(_ n: Int) -> [TreeNode?] {
        func generate(_ left: Int, _ right: Int) -> [TreeNode?] {
            if left > right {
                return [nil]
            }

            var res = [TreeNode?]()
            for val in left...right {
                let leftTrees = generate(left, val - 1)
                let rightTrees = generate(val + 1, right)

                for leftTree in leftTrees {
                    for rightTree in rightTrees {
                        res.append(TreeNode(val, leftTree, rightTree))
                    }
                }
            }
            return res
        }
        return generate(1, n)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\frac {4 ^ n}{\sqrt {n}})$
- Space complexity:
    - $O(n)$ space for recursion stack.
    - $O(\frac {4 ^ n}{\sqrt {n}})$ space for the output.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def generateTrees(self, n: int) -> List[Optional[TreeNode]]:
        dp = {}

        def generate(left, right):
            if left > right:
                return [None]
            if (left, right) in dp:
                return dp[(left, right)]

            res = []
            for val in range(left, right + 1):
                for leftTree in generate(left, val - 1):
                    for rightTree in generate(val + 1, right):
                        root = TreeNode(val, leftTree, rightTree)
                        res.append(root)

            dp[(left, right)] = res
            return res

        return generate(1, n)
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
    private List<TreeNode>[][] dp;

    public List<TreeNode> generateTrees(int n) {
        dp = new ArrayList[n + 1][n + 1];
        return generate(1, n);
    }

    private List<TreeNode> generate(int left, int right) {
        if (left > right) return Collections.singletonList(null);
        if (dp[left][right] != null) return dp[left][right];

        List<TreeNode> res = new ArrayList<>();
        for (int val = left; val <= right; val++) {
            for (TreeNode leftTree : generate(left, val - 1)) {
                for (TreeNode rightTree : generate(val + 1, right)) {
                    res.add(new TreeNode(val, leftTree, rightTree));
                }
            }
        }
        return dp[left][right] = res;
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
    vector<vector<vector<TreeNode*>>> dp;

    vector<TreeNode*> generateTrees(int n) {
        dp.resize(n + 1, vector<vector<TreeNode*>>(n + 1));
        return generate(1, n);
    }

private:
    vector<TreeNode*> generate(int left, int right) {
        if (left > right) return {nullptr};
        if (!dp[left][right].empty()) return dp[left][right];

        vector<TreeNode*> res;
        for (int val = left; val <= right; val++) {
            for (auto& leftTree : generate(left, val - 1)) {
                for (auto& rightTree : generate(val + 1, right)) {
                    res.push_back(new TreeNode(val, leftTree, rightTree));
                }
            }
        }
        return dp[left][right] = res;
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
     * @param {number} n
     * @return {TreeNode[]}
     */
    generateTrees(n) {
        const dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(null));

        const generate = (left, right) => {
            if (left > right) return [null];
            if (dp[left][right]) return dp[left][right];

            let res = [];
            for (let val = left; val <= right; val++) {
                for (let leftTree of generate(left, val - 1)) {
                    for (let rightTree of generate(val + 1, right)) {
                        res.push(new TreeNode(val, leftTree, rightTree));
                    }
                }
            }
            return (dp[left][right] = res);
        };

        return generate(1, n);
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
    private IList<TreeNode>[][] dp;

    public IList<TreeNode> GenerateTrees(int n) {
        dp = new IList<TreeNode>[n + 1][];
        for (int i = 0; i <= n; i++) {
            dp[i] = new IList<TreeNode>[n + 1];
        }
        return Generate(1, n);
    }

    private IList<TreeNode> Generate(int left, int right) {
        if (left > right) return new List<TreeNode> { null };
        if (dp[left][right] != null) return dp[left][right];

        var res = new List<TreeNode>();
        for (int val = left; val <= right; val++) {
            foreach (var leftTree in Generate(left, val - 1)) {
                foreach (var rightTree in Generate(val + 1, right)) {
                    res.Add(new TreeNode(val, leftTree, rightTree));
                }
            }
        }
        return dp[left][right] = res;
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
func generateTrees(n int) []*TreeNode {
    dp := make([][][]*TreeNode, n+1)
    for i := range dp {
        dp[i] = make([][]*TreeNode, n+1)
    }

    var generate func(left, right int) []*TreeNode
    generate = func(left, right int) []*TreeNode {
        if left > right {
            return []*TreeNode{nil}
        }
        if dp[left][right] != nil {
            return dp[left][right]
        }

        var res []*TreeNode
        for val := left; val <= right; val++ {
            for _, leftTree := range generate(left, val-1) {
                for _, rightTree := range generate(val+1, right) {
                    res = append(res, &TreeNode{val, leftTree, rightTree})
                }
            }
        }
        dp[left][right] = res
        return res
    }
    return generate(1, n)
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
    fun generateTrees(n: Int): List<TreeNode?> {
        val dp = Array<Array<List<TreeNode?>?>>(n + 1) { arrayOfNulls(n + 1) }

        fun generate(left: Int, right: Int): List<TreeNode?> {
            if (left > right) return listOf(null)
            dp[left][right]?.let { return it }

            val res = mutableListOf<TreeNode?>()
            for (v in left..right) {
                for (leftTree in generate(left, v - 1)) {
                    for (rightTree in generate(v + 1, right)) {
                        res.add(TreeNode(v).apply {
                            this.left = leftTree
                            this.right = rightTree
                        })
                    }
                }
            }
            dp[left][right] = res
            return res
        }
        return generate(1, n)
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
    func generateTrees(_ n: Int) -> [TreeNode?] {
        var dp = [[TreeNode?]?](repeating: nil, count: (n + 1) * (n + 1))

        func generate(_ left: Int, _ right: Int) -> [TreeNode?] {
            if left > right {
                return [nil]
            }
            let key = left * (n + 1) + right
            if let cached = dp[key] {
                return cached
            }

            var res = [TreeNode?]()
            for val in left...right {
                for leftTree in generate(left, val - 1) {
                    for rightTree in generate(val + 1, right) {
                        res.append(TreeNode(val, leftTree, rightTree))
                    }
                }
            }
            dp[key] = res
            return res
        }
        return generate(1, n)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\frac {4 ^ n}{\sqrt {n}})$
- Space complexity:
    - $O(n)$ space for recursion stack.
    - $O(n ^ 2)$ extra space.
    - $O(\frac {4 ^ n}{\sqrt {n}})$ space for the output.

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def generateTrees(self, n: int) -> List[Optional[TreeNode]]:
        dp = [[[] for _ in range(n + 2)] for _ in range(n + 2)]
        for i in range(1, n + 2):
            dp[i][i - 1] = [None]

        for length in range(1, n + 1):
            for left in range(1, n - length + 2):
                right = left + length - 1
                dp[left][right] = []
                for val in range(left, right + 1):
                    for leftTree in dp[left][val - 1]:
                        for rightTree in dp[val + 1][right]:
                            root = TreeNode(val, leftTree, rightTree)
                            dp[left][right].append(root)

        return dp[1][n]
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
    public List<TreeNode> generateTrees(int n) {
        List<TreeNode>[][] dp = new ArrayList[n + 2][n + 2];
        for (int i = 1; i <= n + 1; i++) {
            dp[i][i - 1] = new ArrayList<>();
            dp[i][i - 1].add(null);
        }

        for (int length = 1; length <= n; length++) {
            for (int left = 1; left + length - 1 <= n; left++) {
                int right = left + length - 1;
                dp[left][right] = new ArrayList<>();

                for (int val = left; val <= right; val++) {
                    for (TreeNode leftTree : dp[left][val - 1]) {
                        for (TreeNode rightTree : dp[val + 1][right]) {
                            dp[left][right].add(new TreeNode(val, leftTree, rightTree));
                        }
                    }
                }
            }
        }
        return dp[1][n];
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
    vector<TreeNode*> generateTrees(int n) {
        vector<vector<vector<TreeNode*>>> dp(n + 2, vector<vector<TreeNode*>>(n + 2));
        for (int i = 1; i <= n + 1; i++) {
            dp[i][i - 1].push_back(nullptr);
        }

        for (int length = 1; length <= n; length++) {
            for (int left = 1; left + length - 1 <= n; left++) {
                int right = left + length - 1;

                for (int val = left; val <= right; val++) {
                    for (auto& leftTree : dp[left][val - 1]) {
                        for (auto& rightTree : dp[val + 1][right]) {
                            dp[left][right].push_back(new TreeNode(val, leftTree, rightTree));
                        }
                    }
                }
            }
        }
        return dp[1][n];
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
     * @param {number} n
     * @return {TreeNode[]}
     */
    generateTrees(n) {
        const dp = Array.from({ length: n + 2 }, () => Array(n + 2).fill(null));
        for (let i = 1; i <= n + 1; i++) {
            dp[i][i - 1] = [null];
        }

        for (let length = 1; length <= n; length++) {
            for (let left = 1; left + length - 1 <= n; left++) {
                let right = left + length - 1;
                dp[left][right] = [];

                for (let val = left; val <= right; val++) {
                    for (let leftTree of dp[left][val - 1]) {
                        for (let rightTree of dp[val + 1][right]) {
                            dp[left][right].push(
                                new TreeNode(val, leftTree, rightTree),
                            );
                        }
                    }
                }
            }
        }
        return dp[1][n];
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
    public IList<TreeNode> GenerateTrees(int n) {
        var dp = new List<TreeNode>[n + 2, n + 2];
        for (int i = 1; i <= n + 1; i++) {
            dp[i, i - 1] = new List<TreeNode> { null };
        }

        for (int length = 1; length <= n; length++) {
            for (int left = 1; left + length - 1 <= n; left++) {
                int right = left + length - 1;
                dp[left, right] = new List<TreeNode>();

                for (int val = left; val <= right; val++) {
                    foreach (var leftTree in dp[left, val - 1]) {
                        foreach (var rightTree in dp[val + 1, right]) {
                            dp[left, right].Add(new TreeNode(val, leftTree, rightTree));
                        }
                    }
                }
            }
        }
        return dp[1, n];
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
func generateTrees(n int) []*TreeNode {
    dp := make([][][]*TreeNode, n+2)
    for i := range dp {
        dp[i] = make([][]*TreeNode, n+2)
    }
    for i := 1; i <= n+1; i++ {
        dp[i][i-1] = []*TreeNode{nil}
    }

    for length := 1; length <= n; length++ {
        for left := 1; left+length-1 <= n; left++ {
            right := left + length - 1
            dp[left][right] = []*TreeNode{}

            for val := left; val <= right; val++ {
                for _, leftTree := range dp[left][val-1] {
                    for _, rightTree := range dp[val+1][right] {
                        dp[left][right] = append(dp[left][right], &TreeNode{val, leftTree, rightTree})
                    }
                }
            }
        }
    }
    return dp[1][n]
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
    fun generateTrees(n: Int): List<TreeNode?> {
        val dp = Array(n + 2) { Array<MutableList<TreeNode?>?>(n + 2) { null } }
        for (i in 1..n + 1) {
            dp[i][i - 1] = mutableListOf(null)
        }

        for (length in 1..n) {
            for (left in 1..n - length + 1) {
                val right = left + length - 1
                dp[left][right] = mutableListOf()

                for (v in left..right) {
                    for (leftTree in dp[left][v - 1]!!) {
                        for (rightTree in dp[v + 1][right]!!) {
                            dp[left][right]!!.add(TreeNode(v).apply {
                                this.left = leftTree
                                this.right = rightTree
                            })
                        }
                    }
                }
            }
        }
        return dp[1][n]!!
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
    func generateTrees(_ n: Int) -> [TreeNode?] {
        var dp = [[[TreeNode?]]](repeating: [[TreeNode?]](repeating: [], count: n + 2), count: n + 2)
        for i in 1...n + 1 {
            dp[i][i - 1] = [nil]
        }

        for length in 1...n {
            for left in 1...(n - length + 1) {
                let right = left + length - 1
                dp[left][right] = []

                for val in left...right {
                    for leftTree in dp[left][val - 1] {
                        for rightTree in dp[val + 1][right] {
                            dp[left][right].append(TreeNode(val, leftTree, rightTree))
                        }
                    }
                }
            }
        }
        return dp[1][n]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\frac {4 ^ n}{\sqrt {n}})$
- Space complexity:
    - $O(n ^ 2)$ extra space.
    - $O(\frac {4 ^ n}{\sqrt {n}})$ space for the output.

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def generateTrees(self, n: int) -> list[Optional[TreeNode]]:
        dp = [[] for _ in range(n + 1)]
        dp[0] = [None]

        for length in range(1, n + 1):
            dp[length] = []
            for val in range(1, length + 1):
                for leftTree in dp[val - 1]:
                    for rightTree in dp[length - val]:
                        root = TreeNode(val)
                        root.left = leftTree
                        root.right = self.shift(rightTree, val)
                        dp[length].append(root)

        return dp[n]

    def shift(self, node: Optional[TreeNode], offset: int) -> Optional[TreeNode]:
        if not node:
            return None
        root = TreeNode(node.val + offset)
        root.left = self.shift(node.left, offset)
        root.right = self.shift(node.right, offset)
        return root
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
    public List<TreeNode> generateTrees(int n) {
        List<TreeNode>[] dp = new ArrayList[n + 1];
        dp[0] = new ArrayList<>();
        dp[0].add(null);

        for (int length = 1; length <= n; length++) {
            dp[length] = new ArrayList<>();
            for (int val = 1; val <= length; val++) {
                for (TreeNode leftTree : dp[val - 1]) {
                    for (TreeNode rightTree : dp[length - val]) {
                        TreeNode root = new TreeNode(val);
                        root.left = leftTree;
                        root.right = shift(rightTree, val);
                        dp[length].add(root);
                    }
                }
            }
        }
        return dp[n];
    }

    private TreeNode shift(TreeNode node, int offset) {
        if (node == null) return null;
        TreeNode root = new TreeNode(node.val + offset);
        root.left = shift(node.left, offset);
        root.right = shift(node.right, offset);
        return root;
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
    vector<TreeNode*> generateTrees(int n) {
        vector<vector<TreeNode*>> dp(n + 1);
        dp[0].push_back(nullptr);

        for (int length = 1; length <= n; length++) {
            for (int val = 1; val <= length; val++) {
                for (auto& leftTree : dp[val - 1]) {
                    for (auto& rightTree : dp[length - val]) {
                        TreeNode* root = new TreeNode(val);
                        root->left = leftTree;
                        root->right = shift(rightTree, val);
                        dp[length].push_back(root);
                    }
                }
            }
        }
        return dp[n];
    }

private:
    TreeNode* shift(TreeNode* node, int offset) {
        if (!node) return nullptr;
        TreeNode* root = new TreeNode(node->val + offset);
        root->left = shift(node->left, offset);
        root->right = shift(node->right, offset);
        return root;
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
     * @param {number} n
     * @return {TreeNode[]}
     */
    generateTrees(n) {
        const shift = (node, offset) => {
            if (!node) return null;
            let root = new TreeNode(node.val + offset);
            root.left = shift(node.left, offset);
            root.right = shift(node.right, offset);
            return root;
        };

        let dp = Array.from({ length: n + 1 }, () => []);
        dp[0].push(null);

        for (let length = 1; length <= n; length++) {
            for (let val = 1; val <= length; val++) {
                for (let leftTree of dp[val - 1]) {
                    for (let rightTree of dp[length - val]) {
                        let root = new TreeNode(val);
                        root.left = leftTree;
                        root.right = shift(rightTree, val);
                        dp[length].push(root);
                    }
                }
            }
        }
        return dp[n];
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
    public IList<TreeNode> GenerateTrees(int n) {
        var dp = new List<TreeNode>[n + 1];
        dp[0] = new List<TreeNode> { null };

        for (int length = 1; length <= n; length++) {
            dp[length] = new List<TreeNode>();
            for (int val = 1; val <= length; val++) {
                foreach (var leftTree in dp[val - 1]) {
                    foreach (var rightTree in dp[length - val]) {
                        var root = new TreeNode(val);
                        root.left = leftTree;
                        root.right = Shift(rightTree, val);
                        dp[length].Add(root);
                    }
                }
            }
        }
        return dp[n];
    }

    private TreeNode Shift(TreeNode node, int offset) {
        if (node == null) return null;
        var root = new TreeNode(node.val + offset);
        root.left = Shift(node.left, offset);
        root.right = Shift(node.right, offset);
        return root;
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
func generateTrees(n int) []*TreeNode {
    var shift func(node *TreeNode, offset int) *TreeNode
    shift = func(node *TreeNode, offset int) *TreeNode {
        if node == nil {
            return nil
        }
        root := &TreeNode{Val: node.Val + offset}
        root.Left = shift(node.Left, offset)
        root.Right = shift(node.Right, offset)
        return root
    }

    dp := make([][]*TreeNode, n+1)
    dp[0] = []*TreeNode{nil}

    for length := 1; length <= n; length++ {
        dp[length] = []*TreeNode{}
        for val := 1; val <= length; val++ {
            for _, leftTree := range dp[val-1] {
                for _, rightTree := range dp[length-val] {
                    root := &TreeNode{Val: val}
                    root.Left = leftTree
                    root.Right = shift(rightTree, val)
                    dp[length] = append(dp[length], root)
                }
            }
        }
    }
    return dp[n]
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
    fun generateTrees(n: Int): List<TreeNode?> {
        fun shift(node: TreeNode?, offset: Int): TreeNode? {
            if (node == null) return null
            val root = TreeNode(node.`val` + offset)
            root.left = shift(node.left, offset)
            root.right = shift(node.right, offset)
            return root
        }

        val dp = Array<MutableList<TreeNode?>>(n + 1) { mutableListOf() }
        dp[0].add(null)

        for (length in 1..n) {
            for (v in 1..length) {
                for (leftTree in dp[v - 1]) {
                    for (rightTree in dp[length - v]) {
                        val root = TreeNode(v)
                        root.left = leftTree
                        root.right = shift(rightTree, v)
                        dp[length].add(root)
                    }
                }
            }
        }
        return dp[n]
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
    func generateTrees(_ n: Int) -> [TreeNode?] {
        func shift(_ node: TreeNode?, _ offset: Int) -> TreeNode? {
            guard let node = node else { return nil }
            let root = TreeNode(node.val + offset)
            root.left = shift(node.left, offset)
            root.right = shift(node.right, offset)
            return root
        }

        var dp = [[TreeNode?]](repeating: [], count: n + 1)
        dp[0] = [nil]

        for length in 1...n {
            for val in 1...length {
                for leftTree in dp[val - 1] {
                    for rightTree in dp[length - val] {
                        let root = TreeNode(val)
                        root.left = leftTree
                        root.right = shift(rightTree, val)
                        dp[length].append(root)
                    }
                }
            }
        }
        return dp[n]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\frac {4 ^ n}{\sqrt {n}})$
- Space complexity:
    - $O(n)$ for the recursion stack.
    - $O(n)$ extra space.
    - $O(\frac {4 ^ n}{\sqrt {n}})$ space for the output.
