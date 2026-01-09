## 1. Recursion

### Intuition

A full binary tree has every node with either 0 or 2 children. If we have `n` nodes, one becomes the root, and we split the remaining `n-1` nodes between the left and right subtrees. Each subtree must also be a full binary tree.

We try all possible ways to distribute `n-1` nodes between left and right. For each valid split, we recursively generate all possible left subtrees and all possible right subtrees, then combine each left-right pair under a new root.

### Algorithm

1. Base cases: If `n == 0`, return an empty list. If `n == 1`, return a list with a single node.
2. For `l` from `0` to `n-1`:
   - Set `r = n - 1 - l` (remaining nodes for the right subtree).
   - Recursively get all full binary trees with `l` nodes for the left.
   - Recursively get all full binary trees with `r` nodes for the right.
   - For each combination of left and right subtree, create a new root and add it to the `res`.
3. Return the `res` list.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def allPossibleFBT(self, n: int) -> List[Optional[TreeNode]]:
        def backtrack(n):
            if n == 0:
                return []
            if n == 1:
                return [TreeNode(0)]

            res = []
            for l in range(n):
                r = n - 1 - l
                leftTrees, rightTrees = backtrack(l), backtrack(r)

                for t1 in leftTrees:
                    for t2 in rightTrees:
                        res.append(TreeNode(0, t1, t2))
            return res

        return backtrack(n)
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
    public List<TreeNode> allPossibleFBT(int n) {
        return backtrack(n);
    }

    private List<TreeNode> backtrack(int n) {
        if (n == 0) {
            return new ArrayList<>();
        }
        if (n == 1) {
            return Arrays.asList(new TreeNode(0));
        }

        List<TreeNode> res = new ArrayList<>();
        for (int l = 0; l < n; l++) {
            int r = n - 1 - l;
            List<TreeNode> leftTrees = backtrack(l);
            List<TreeNode> rightTrees = backtrack(r);

            for (TreeNode t1 : leftTrees) {
                for (TreeNode t2 : rightTrees) {
                    res.add(new TreeNode(0, t1, t2));
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
    vector<TreeNode*> allPossibleFBT(int n) {
        return backtrack(n);
    }

private:
    vector<TreeNode*> backtrack(int n) {
        if (n == 0) {
            return {};
        }
        if (n == 1) {
            return {new TreeNode(0)};
        }

        vector<TreeNode*> res;
        for (int l = 0; l < n; l++) {
            int r = n - 1 - l;
            vector<TreeNode*> leftTrees = backtrack(l);
            vector<TreeNode*> rightTrees = backtrack(r);

            for (auto& t1 : leftTrees) {
                for (auto& t2 : rightTrees) {
                    res.push_back(new TreeNode(0, t1, t2));
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
    allPossibleFBT(n) {
        const backtrack = (n) => {
            if (n === 0) {
                return [];
            }
            if (n === 1) {
                return [new TreeNode(0)];
            }

            let res = [];
            for (let l = 0; l < n; l++) {
                let r = n - 1 - l;
                let leftTrees = backtrack(l);
                let rightTrees = backtrack(r);

                for (let t1 of leftTrees) {
                    for (let t2 of rightTrees) {
                        res.push(new TreeNode(0, t1, t2));
                    }
                }
            }
            return res;
        };

        return backtrack(n);
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
    public IList<TreeNode> AllPossibleFBT(int n) {
        return Backtrack(n);
    }

    private IList<TreeNode> Backtrack(int n) {
        if (n == 0) {
            return new List<TreeNode>();
        }
        if (n == 1) {
            return new List<TreeNode> { new TreeNode(0) };
        }

        List<TreeNode> res = new List<TreeNode>();
        for (int l = 0; l < n; l++) {
            int r = n - 1 - l;
            IList<TreeNode> leftTrees = Backtrack(l);
            IList<TreeNode> rightTrees = Backtrack(r);

            foreach (TreeNode t1 in leftTrees) {
                foreach (TreeNode t2 in rightTrees) {
                    res.Add(new TreeNode(0, t1, t2));
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
func allPossibleFBT(n int) []*TreeNode {
    var backtrack func(n int) []*TreeNode
    backtrack = func(n int) []*TreeNode {
        if n == 0 {
            return []*TreeNode{}
        }
        if n == 1 {
            return []*TreeNode{{Val: 0}}
        }

        res := []*TreeNode{}
        for l := 0; l < n; l++ {
            r := n - 1 - l
            leftTrees := backtrack(l)
            rightTrees := backtrack(r)

            for _, t1 := range leftTrees {
                for _, t2 := range rightTrees {
                    res = append(res, &TreeNode{Val: 0, Left: t1, Right: t2})
                }
            }
        }
        return res
    }

    return backtrack(n)
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
    fun allPossibleFBT(n: Int): List<TreeNode?> {
        fun backtrack(n: Int): List<TreeNode?> {
            if (n == 0) return emptyList()
            if (n == 1) return listOf(TreeNode(0))

            val res = mutableListOf<TreeNode?>()
            for (l in 0 until n) {
                val r = n - 1 - l
                val leftTrees = backtrack(l)
                val rightTrees = backtrack(r)

                for (t1 in leftTrees) {
                    for (t2 in rightTrees) {
                        res.add(TreeNode(0).apply {
                            left = t1
                            right = t2
                        })
                    }
                }
            }
            return res
        }

        return backtrack(n)
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
    func allPossibleFBT(_ n: Int) -> [TreeNode?] {
        func backtrack(_ n: Int) -> [TreeNode?] {
            if n == 0 { return [] }
            if n == 1 { return [TreeNode(0)] }

            var res = [TreeNode?]()
            for l in 0..<n {
                let r = n - 1 - l
                let leftTrees = backtrack(l)
                let rightTrees = backtrack(r)

                for t1 in leftTrees {
                    for t2 in rightTrees {
                        res.append(TreeNode(0, t1, t2))
                    }
                }
            }
            return res
        }

        return backtrack(n)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n * 2 ^ n)$

---

## 2. Recursion (Optimal)

### Intuition

A full binary tree with `n` nodes only exists when `n` is odd. Every full binary tree has one root plus pairs of nodes in the subtrees, so the total must be odd. This lets us prune impossible cases immediately.

Additionally, we only need to try odd values for the `left` subtree size since each subtree must also form a valid full binary tree (requiring an odd count). This cuts the search space roughly in half.

### Algorithm

1. If `n` is even, return an empty list (impossible to form a full binary tree).
2. If `n == 1`, return a list with a single node.
3. For `left` from `1` to `n-1`, stepping by `2` (odd values only):
   - Recursively get all full binary trees with `left` nodes.
   - Recursively get all full binary trees with `n - 1 - left` nodes.
   - Combine each pair under a new `root` and add to the `res`.
4. Return the `res` list.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def allPossibleFBT(self, n: int) -> List[Optional[TreeNode]]:
        if n % 2 == 0:
            return []
        if n == 1:
            return [TreeNode(0)]

        res = []
        for left in range(1, n, 2):
            leftSubTree = self.allPossibleFBT(left)
            rightSubTree = self.allPossibleFBT(n - 1 - left)
            for l in leftSubTree:
                for r in rightSubTree:
                    root = TreeNode(0, l, r)
                    res.append(root)
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
    public List<TreeNode> allPossibleFBT(int n) {
        if (n % 2 == 0) {
            return new ArrayList<>();
        }
        if (n == 1) {
            return Arrays.asList(new TreeNode(0));
        }

        List<TreeNode> res = new ArrayList<>();
        for (int left = 1; left < n; left += 2) {
            List<TreeNode> leftSubTree = allPossibleFBT(left);
            List<TreeNode> rightSubTree = allPossibleFBT(n - 1 - left);
            for (TreeNode l : leftSubTree) {
                for (TreeNode r : rightSubTree) {
                    TreeNode root = new TreeNode(0, l, r);
                    res.add(root);
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
    vector<TreeNode*> allPossibleFBT(int n) {
        if (n % 2 == 0) {
            return {};
        }
        if (n == 1) {
            return {new TreeNode(0)};
        }

        vector<TreeNode*> res;
        for (int left = 1; left < n; left += 2) {
            vector<TreeNode*> leftSubTree = allPossibleFBT(left);
            vector<TreeNode*> rightSubTree = allPossibleFBT(n - 1 - left);
            for (auto& l : leftSubTree) {
                for (auto& r : rightSubTree) {
                    TreeNode* root = new TreeNode(0, l, r);
                    res.push_back(root);
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
    allPossibleFBT(n) {
        if (n % 2 === 0) {
            return [];
        }
        if (n === 1) {
            return [new TreeNode(0)];
        }

        let res = [];
        for (let left = 1; left < n; left += 2) {
            let leftSubTree = this.allPossibleFBT(left);
            let rightSubTree = this.allPossibleFBT(n - 1 - left);
            for (let l of leftSubTree) {
                for (let r of rightSubTree) {
                    let root = new TreeNode(0, l, r);
                    res.push(root);
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public IList<TreeNode> AllPossibleFBT(int n) {
        if (n % 2 == 0) {
            return new List<TreeNode>();
        }
        if (n == 1) {
            return new List<TreeNode> { new TreeNode(0) };
        }

        List<TreeNode> res = new List<TreeNode>();
        for (int left = 1; left < n; left += 2) {
            IList<TreeNode> leftSubTree = AllPossibleFBT(left);
            IList<TreeNode> rightSubTree = AllPossibleFBT(n - 1 - left);
            foreach (TreeNode l in leftSubTree) {
                foreach (TreeNode r in rightSubTree) {
                    res.Add(new TreeNode(0, l, r));
                }
            }
        }
        return res;
    }
}
```

```go
func allPossibleFBT(n int) []*TreeNode {
    if n%2 == 0 {
        return []*TreeNode{}
    }
    if n == 1 {
        return []*TreeNode{{Val: 0}}
    }

    res := []*TreeNode{}
    for left := 1; left < n; left += 2 {
        leftSubTree := allPossibleFBT(left)
        rightSubTree := allPossibleFBT(n - 1 - left)
        for _, l := range leftSubTree {
            for _, r := range rightSubTree {
                res = append(res, &TreeNode{Val: 0, Left: l, Right: r})
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun allPossibleFBT(n: Int): List<TreeNode?> {
        if (n % 2 == 0) return emptyList()
        if (n == 1) return listOf(TreeNode(0))

        val res = mutableListOf<TreeNode?>()
        for (left in 1 until n step 2) {
            val leftSubTree = allPossibleFBT(left)
            val rightSubTree = allPossibleFBT(n - 1 - left)
            for (l in leftSubTree) {
                for (r in rightSubTree) {
                    res.add(TreeNode(0).apply {
                        this.left = l
                        right = r
                    })
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func allPossibleFBT(_ n: Int) -> [TreeNode?] {
        if n % 2 == 0 { return [] }
        if n == 1 { return [TreeNode(0)] }

        var res = [TreeNode?]()
        for left in stride(from: 1, to: n, by: 2) {
            let leftSubTree = allPossibleFBT(left)
            let rightSubTree = allPossibleFBT(n - 1 - left)
            for l in leftSubTree {
                for r in rightSubTree {
                    res.append(TreeNode(0, l, r))
                }
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n * 2 ^ n)$

---

## 3. Dynamic Programming (Top-Down)

### Intuition

The recursive solution recomputes the same subproblems multiple times. For example, when building trees of size 7, we compute trees of size 3 several times across different branches.

By caching results in a hash map or array, we ensure each subproblem is solved only once. The first time we compute all trees for a given `n`, we store them. Future calls simply return the cached `dp` result.

### Algorithm

1. Create a memoization map `dp` to store results for each `n`.
2. Define a recursive function `dfs(n)`:
   - If `n` is even, return an empty list.
   - If `n == 1`, return a list with a single node.
   - If `dp[n]` exists, return it.
   - For `left` from `1` to `n-1`, stepping by `2`:
     - Recursively get left and right subtrees.
     - Combine all pairs under new roots.
   - Store the `res` in `dp[n]` and return it.
3. Call `dfs(n)` and return the result.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def allPossibleFBT(self, n: int) -> List[Optional[TreeNode]]:
        dp = {}

        def dfs(n):
            if n % 2 == 0:
                return []
            if n == 1:
                return [TreeNode(0)]
            if n in dp:
                return dp[n]

            res = []
            for left in range(1, n, 2):
                leftSubTree = dfs(left)
                rightSubTree = dfs(n - 1 - left)
                for l in leftSubTree:
                    for r in rightSubTree:
                        res.append(TreeNode(0, l, r))

            dp[n] = res
            return res

        return dfs(n)
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
    private List<TreeNode>[] dp;

    public List<TreeNode> allPossibleFBT(int n) {
        dp = new ArrayList[n + 1];
        return dfs(n);
    }

    private List<TreeNode> dfs(int n) {
        if (n % 2 == 0) {
            return new ArrayList<>();
        }
        if (n == 1) {
            return Arrays.asList(new TreeNode(0));
        }
        if (dp[n] != null) {
            return dp[n];
        }

        List<TreeNode> res = new ArrayList<>();
        for (int left = 1; left < n; left += 2) {
            List<TreeNode> leftSubTree = dfs(left);
            List<TreeNode> rightSubTree = dfs(n - 1 - left);
            for (TreeNode l : leftSubTree) {
                for (TreeNode r : rightSubTree) {
                    res.add(new TreeNode(0, l, r));
                }
            }
        }

        return dp[n] = res;
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
    vector<vector<TreeNode*>> dp;

public:
    vector<TreeNode*> allPossibleFBT(int n) {
        dp.resize(n + 1);
        return dfs(n);
    }

    vector<TreeNode*> dfs(int n) {
        if (n % 2 == 0) {
            return {};
        }
        if (n == 1) {
            return {new TreeNode(0)};
        }
        if (!dp[n].empty()) {
            return dp[n];
        }

        vector<TreeNode*> res;
        for (int left = 1; left < n; left += 2) {
            vector<TreeNode*> leftSubTree = dfs(left);
            vector<TreeNode*> rightSubTree = dfs(n - 1 - left);
            for (auto& l : leftSubTree) {
                for (auto& r : rightSubTree) {
                    res.push_back(new TreeNode(0, l, r));
                }
            }
        }

        return dp[n] = res;
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
    allPossibleFBT(n) {
        let dp = new Array(n + 1);

        const dfs = (n) => {
            if (n % 2 === 0) {
                return [];
            }
            if (n === 1) {
                return [new TreeNode(0)];
            }
            if (dp[n]) {
                return dp[n];
            }

            let res = [];
            for (let left = 1; left < n; left += 2) {
                let leftSubTree = dfs(left);
                let rightSubTree = dfs(n - 1 - left);
                for (let t1 of leftSubTree) {
                    for (let t2 of rightSubTree) {
                        res.push(new TreeNode(0, t1, t2));
                    }
                }
            }

            return (dp[n] = res);
        };

        return dfs(n);
    }
}
```

```csharp
public class Solution {
    private IList<TreeNode>[] dp;

    public IList<TreeNode> AllPossibleFBT(int n) {
        dp = new IList<TreeNode>[n + 1];
        return Dfs(n);
    }

    private IList<TreeNode> Dfs(int n) {
        if (n % 2 == 0) {
            return new List<TreeNode>();
        }
        if (n == 1) {
            return new List<TreeNode> { new TreeNode(0) };
        }
        if (dp[n] != null) {
            return dp[n];
        }

        List<TreeNode> res = new List<TreeNode>();
        for (int left = 1; left < n; left += 2) {
            IList<TreeNode> leftSubTree = Dfs(left);
            IList<TreeNode> rightSubTree = Dfs(n - 1 - left);
            foreach (TreeNode l in leftSubTree) {
                foreach (TreeNode r in rightSubTree) {
                    res.Add(new TreeNode(0, l, r));
                }
            }
        }

        dp[n] = res;
        return res;
    }
}
```

```go
func allPossibleFBT(n int) []*TreeNode {
    dp := make([][]*TreeNode, n+1)

    var dfs func(n int) []*TreeNode
    dfs = func(n int) []*TreeNode {
        if n%2 == 0 {
            return []*TreeNode{}
        }
        if n == 1 {
            return []*TreeNode{{Val: 0}}
        }
        if dp[n] != nil {
            return dp[n]
        }

        res := []*TreeNode{}
        for left := 1; left < n; left += 2 {
            leftSubTree := dfs(left)
            rightSubTree := dfs(n - 1 - left)
            for _, l := range leftSubTree {
                for _, r := range rightSubTree {
                    res = append(res, &TreeNode{Val: 0, Left: l, Right: r})
                }
            }
        }

        dp[n] = res
        return res
    }

    return dfs(n)
}
```

```kotlin
class Solution {
    fun allPossibleFBT(n: Int): List<TreeNode?> {
        val dp = arrayOfNulls<List<TreeNode?>>(n + 1)

        fun dfs(n: Int): List<TreeNode?> {
            if (n % 2 == 0) return emptyList()
            if (n == 1) return listOf(TreeNode(0))
            if (dp[n] != null) return dp[n]!!

            val res = mutableListOf<TreeNode?>()
            for (left in 1 until n step 2) {
                val leftSubTree = dfs(left)
                val rightSubTree = dfs(n - 1 - left)
                for (l in leftSubTree) {
                    for (r in rightSubTree) {
                        res.add(TreeNode(0).apply {
                            this.left = l
                            right = r
                        })
                    }
                }
            }

            dp[n] = res
            return res
        }

        return dfs(n)
    }
}
```

```swift
class Solution {
    func allPossibleFBT(_ n: Int) -> [TreeNode?] {
        var dp = [[TreeNode?]?](repeating: nil, count: n + 1)

        func dfs(_ n: Int) -> [TreeNode?] {
            if n % 2 == 0 { return [] }
            if n == 1 { return [TreeNode(0)] }
            if let cached = dp[n] { return cached }

            var res = [TreeNode?]()
            for left in stride(from: 1, to: n, by: 2) {
                let leftSubTree = dfs(left)
                let rightSubTree = dfs(n - 1 - left)
                for l in leftSubTree {
                    for r in rightSubTree {
                        res.append(TreeNode(0, l, r))
                    }
                }
            }

            dp[n] = res
            return res
        }

        return dfs(n)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n * 2 ^ n)$

---

## 4. Dynamic Programming (Bottom-Up)

### Intuition

Instead of recursing from `n` down and caching, we can build solutions bottom-up. We start with the base case (`n=1`), then iteratively compute solutions for `n=3, 5, 7, ...` up to the target.

For each odd value, we combine previously computed smaller trees to form larger ones. Since we only ever need results for smaller odd numbers, and we compute them in order, all dependencies are satisfied when we need them.

### Algorithm

1. If `n` is even, return an empty list.
2. Create an array `dp` where `dp[i]` will store all full binary trees with `i` nodes.
3. Initialize `dp[1]` with a single node.
4. For `nodes` from `3` to `n`, stepping by `2`:
   - For `left` from `1` to `nodes-1`, stepping by `2`:
     - Set `right = nodes - 1 - left`.
     - For each tree in `dp[left]` and each tree in `dp[right]`:
       - Create a new `root` combining them and add to `dp[nodes]`.
5. Return `dp[n]`.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def allPossibleFBT(self, n: int) -> List[Optional[TreeNode]]:
        if n % 2 == 0:
            return []

        dp = [[] for _ in range(n + 1)]
        dp[1] = [TreeNode(0)]

        for nodes in range(3, n + 1, 2):
            res = []
            for left in range(1, nodes, 2):
                right = nodes - 1 - left
                for t1 in dp[left]:
                    for t2 in dp[right]:
                        res.append(TreeNode(0, t1, t2))
            dp[nodes] = res

        return dp[n]
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
    public List<TreeNode> allPossibleFBT(int n) {
        if (n % 2 == 0) {
            return new ArrayList<>();
        }

        List<TreeNode>[] dp = new ArrayList[n + 1];
        for (int i = 0; i <= n; i++) {
            dp[i] = new ArrayList<>();
        }
        dp[1].add(new TreeNode(0));

        for (int nodes = 3; nodes <= n; nodes += 2) {
            List<TreeNode> res = new ArrayList<>();
            for (int left = 1; left < nodes; left += 2) {
                int right = nodes - 1 - left;
                for (TreeNode t1 : dp[left]) {
                    for (TreeNode t2 : dp[right]) {
                        res.add(new TreeNode(0, t1, t2));
                    }
                }
            }
            dp[nodes] = res;
        }

        return dp[n];
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
    vector<TreeNode*> allPossibleFBT(int n) {
        if (n % 2 == 0) {
            return {};
        }

        vector<vector<TreeNode*>> dp(n + 1);
        dp[1].push_back(new TreeNode(0));

        for (int nodes = 3; nodes <= n; nodes += 2) {
            vector<TreeNode*> res;
            for (int left = 1; left < nodes; left += 2) {
                int right = nodes - 1 - left;
                for (auto& t1 : dp[left]) {
                    for (auto& t2 : dp[right]) {
                        res.push_back(new TreeNode(0, t1, t2));
                    }
                }
            }
            dp[nodes] = res;
        }

        return dp[n];
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
    allPossibleFBT(n) {
        if (n % 2 === 0) {
            return [];
        }

        let dp = Array.from({ length: n + 1 }, () => []);
        dp[1] = [new TreeNode(0)];

        for (let nodes = 3; nodes <= n; nodes += 2) {
            let res = [];
            for (let left = 1; left < nodes; left += 2) {
                let right = nodes - 1 - left;
                for (let t1 of dp[left]) {
                    for (let t2 of dp[right]) {
                        res.push(new TreeNode(0, t1, t2));
                    }
                }
            }
            dp[nodes] = res;
        }

        return dp[n];
    }
}
```

```csharp
public class Solution {
    public IList<TreeNode> AllPossibleFBT(int n) {
        if (n % 2 == 0) {
            return new List<TreeNode>();
        }

        IList<TreeNode>[] dp = new IList<TreeNode>[n + 1];
        for (int i = 0; i <= n; i++) {
            dp[i] = new List<TreeNode>();
        }
        dp[1].Add(new TreeNode(0));

        for (int nodes = 3; nodes <= n; nodes += 2) {
            List<TreeNode> res = new List<TreeNode>();
            for (int left = 1; left < nodes; left += 2) {
                int right = nodes - 1 - left;
                foreach (TreeNode t1 in dp[left]) {
                    foreach (TreeNode t2 in dp[right]) {
                        res.Add(new TreeNode(0, t1, t2));
                    }
                }
            }
            dp[nodes] = res;
        }

        return dp[n];
    }
}
```

```go
func allPossibleFBT(n int) []*TreeNode {
    if n%2 == 0 {
        return []*TreeNode{}
    }

    dp := make([][]*TreeNode, n+1)
    for i := range dp {
        dp[i] = []*TreeNode{}
    }
    dp[1] = []*TreeNode{{Val: 0}}

    for nodes := 3; nodes <= n; nodes += 2 {
        res := []*TreeNode{}
        for left := 1; left < nodes; left += 2 {
            right := nodes - 1 - left
            for _, t1 := range dp[left] {
                for _, t2 := range dp[right] {
                    res = append(res, &TreeNode{Val: 0, Left: t1, Right: t2})
                }
            }
        }
        dp[nodes] = res
    }

    return dp[n]
}
```

```kotlin
class Solution {
    fun allPossibleFBT(n: Int): List<TreeNode?> {
        if (n % 2 == 0) return emptyList()

        val dp = Array<MutableList<TreeNode?>>(n + 1) { mutableListOf() }
        dp[1].add(TreeNode(0))

        for (nodes in 3..n step 2) {
            val res = mutableListOf<TreeNode?>()
            for (left in 1 until nodes step 2) {
                val right = nodes - 1 - left
                for (t1 in dp[left]) {
                    for (t2 in dp[right]) {
                        res.add(TreeNode(0).apply {
                            this.left = t1
                            this.right = t2
                        })
                    }
                }
            }
            dp[nodes] = res
        }

        return dp[n]
    }
}
```

```swift
class Solution {
    func allPossibleFBT(_ n: Int) -> [TreeNode?] {
        if n % 2 == 0 { return [] }

        var dp = [[TreeNode?]](repeating: [], count: n + 1)
        dp[1] = [TreeNode(0)]

        for nodes in stride(from: 3, through: n, by: 2) {
            var res = [TreeNode?]()
            for left in stride(from: 1, to: nodes, by: 2) {
                let right = nodes - 1 - left
                for t1 in dp[left] {
                    for t2 in dp[right] {
                        res.append(TreeNode(0, t1, t2))
                    }
                }
            }
            dp[nodes] = res
        }

        return dp[n]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n * 2 ^ n)$
