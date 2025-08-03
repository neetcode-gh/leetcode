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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n * 2 ^ n)$

---

## 2. Recursion (Optimal)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n * 2 ^ n)$

---

## 3. Dynamic Programming (Top-Down)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n * 2 ^ n)$

---

## 4. Dynamic Programming (Bottom-Up)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n * 2 ^ n)$
