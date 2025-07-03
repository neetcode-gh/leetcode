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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\frac {4 ^ n}{\sqrt {n}})$
- Space complexity:
    - $O(n)$ for the recursion stack.
    - $O(n)$ extra space.
    - $O(\frac {4 ^ n}{\sqrt {n}})$ space for the output.
