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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
