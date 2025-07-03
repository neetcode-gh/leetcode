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
    def pseudoPalindromicPaths(self, root: Optional[TreeNode]) -> int:
        count = defaultdict(int)
        odd = 0

        def dfs(cur):
            nonlocal odd
            if not cur:
                return 0

            count[cur.val] += 1
            odd_change = 1 if count[cur.val] % 2 == 1 else -1
            odd += odd_change

            if not cur.left and not cur.right:
                res = 1 if odd <= 1 else 0
            else:
                res = dfs(cur.left) + dfs(cur.right)

            odd -= odd_change
            count[cur.val] -= 1
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
    public int pseudoPalindromicPaths(TreeNode root) {
        Map<Integer, Integer> count = new HashMap<>();
        int[] odd = new int[1];

        return dfs(root, count, odd);
    }

    private int dfs(TreeNode cur, Map<Integer, Integer> count, int[] odd) {
        if (cur == null) return 0;

        count.put(cur.val, count.getOrDefault(cur.val, 0) + 1);
        int odd_change = (count.get(cur.val) % 2 == 1) ? 1 : -1;
        odd[0] += odd_change;

        int res;
        if (cur.left == null && cur.right == null) {
            res = (odd[0] <= 1) ? 1 : 0;
        } else {
            res = dfs(cur.left, count, odd) + dfs(cur.right, count, odd);
        }

        odd[0] -= odd_change;
        count.put(cur.val, count.get(cur.val) - 1);
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
    int pseudoPalindromicPaths(TreeNode* root) {
        unordered_map<int, int> count;
        int odd = 0;
        return dfs(root, count, odd);
    }

private:
    int dfs(TreeNode* cur, unordered_map<int, int>& count, int& odd) {
        if (!cur) return 0;

        count[cur->val]++;
        int odd_change = (count[cur->val] % 2 == 1) ? 1 : -1;
        odd += odd_change;

        int res;
        if (!cur->left && !cur->right) {
            res = (odd <= 1) ? 1 : 0;
        } else {
            res = dfs(cur->left, count, odd) + dfs(cur->right, count, odd);
        }

        odd -= odd_change;
        count[cur->val]--;
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
    pseudoPalindromicPaths(root) {
        const count = new Map();
        let odd = 0;

        const dfs = (cur) => {
            if (!cur) return 0;

            count.set(cur.val, (count.get(cur.val) || 0) + 1);
            let odd_change = count.get(cur.val) % 2 === 1 ? 1 : -1;
            odd += odd_change;

            let res;
            if (!cur.left && !cur.right) {
                res = odd <= 1 ? 1 : 0;
            } else {
                res = dfs(cur.left) + dfs(cur.right);
            }

            odd -= odd_change;
            count.set(cur.val, count.get(cur.val) - 1);
            return res;
        };

        return dfs(root);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(h)$ for recursion stack.

> Where $n$ is the number of nodes and $h$ is the height of the given tree.

---

## 2. Depth First Search (Using Array)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def pseudoPalindromicPaths(self, root: Optional[TreeNode]) -> int:
        count = [0] * 10
        odd = 0

        def dfs(cur):
            nonlocal odd
            if not cur:
                return 0

            count[cur.val] ^= 1
            odd += 1 if count[cur.val] else -1

            if not cur.left and not cur.right and odd <= 1:
                res = 1
            else:
                res = dfs(cur.left) + dfs(cur.right)

            odd -= 1 if count[cur.val] else -1
            count[cur.val] ^= 1

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
    public int pseudoPalindromicPaths(TreeNode root) {
        int[] count = new int[10];
        return dfs(root, count, 0);
    }

    private int dfs(TreeNode cur, int[] count, int odd) {
        if (cur == null) return 0;

        count[cur.val] ^= 1;
        odd += count[cur.val] == 1 ? 1 : -1;

        int res = (cur.left == null && cur.right == null && odd <= 1) ? 1
                  : dfs(cur.left, count, odd) + dfs(cur.right, count, odd);

        odd += count[cur.val] == 1 ? 1 : -1;
        count[cur.val] ^= 1;

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
    int pseudoPalindromicPaths(TreeNode* root) {
        int count[10] = {};
        return dfs(root, count, 0);
    }

private:
    int dfs(TreeNode* cur, int count[], int odd) {
        if (!cur) return 0;

        count[cur->val] ^= 1;
        odd += (count[cur->val] == 1) ? 1 : -1;

        int res = (!cur->left && !cur->right && odd <= 1) ? 1
                  : dfs(cur->left, count, odd) + dfs(cur->right, count, odd);

        odd += (count[cur->val] == 1) ? 1 : -1;
        count[cur->val] ^= 1;

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
    pseudoPalindromicPaths(root) {
        const count = new Array(10).fill(0);

        const dfs = (cur, odd) => {
            if (!cur) return 0;

            count[cur.val] ^= 1;
            odd += count[cur.val] === 1 ? 1 : -1;

            let res =
                !cur.left && !cur.right && odd <= 1
                    ? 1
                    : dfs(cur.left, odd) + dfs(cur.right, odd);

            odd += count[cur.val] === 1 ? 1 : -1;
            count[cur.val] ^= 1;

            return res;
        };

        return dfs(root, 0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(h)$ for recursion stack.

> Where $n$ is the number of nodes and $h$ is the height of the given tree.

---

## 3. Depth First Search (Bit Mask)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def pseudoPalindromicPaths(self, root: Optional[TreeNode]) -> int:
        def dfs(node, path):
            if not node:
                return 0

            path ^= 1 << node.val
            if not node.left and not node.right:
                return 1 if (path & (path - 1)) == 0 else 0

            return dfs(node.left, path) + dfs(node.right, path)

        return dfs(root, 0)
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
    public int pseudoPalindromicPaths(TreeNode root) {
        return dfs(root, 0);
    }

    private int dfs(TreeNode node, int path) {
        if (node == null) return 0;

        path ^= (1 << node.val);
        if (node.left == null && node.right == null) {
            return (path & (path - 1)) == 0 ? 1 : 0;
        }

        return dfs(node.left, path) + dfs(node.right, path);
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
    int pseudoPalindromicPaths(TreeNode* root) {
        return dfs(root, 0);
    }

private:
    int dfs(TreeNode* node, int path) {
        if (!node) return 0;

        path ^= (1 << node->val);
        if (!node->left && !node->right) {
            return (path & (path - 1)) == 0 ? 1 : 0;
        }

        return dfs(node->left, path) + dfs(node->right, path);
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
    pseudoPalindromicPaths(root) {
        const dfs = (node, path) => {
            if (!node) return 0;

            path ^= 1 << node.val;
            if (!node.left && !node.right) {
                return (path & (path - 1)) === 0 ? 1 : 0;
            }

            return dfs(node.left, path) + dfs(node.right, path);
        };

        return dfs(root, 0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(h)$ for recursion stack.

> Where $n$ is the number of nodes and $h$ is the height of the given tree.

---

## 4. Breadth First Search

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def pseudoPalindromicPaths(self, root: Optional[TreeNode]) -> int:
        res = 0
        q = deque([(root, 0)])
        while q:
            node, path = q.popleft()
            path ^= 1 << node.val

            if not node.left and not node.right:
                if path & (path - 1) == 0:
                    res += 1
                continue

            if node.left:
                q.append((node.left, path))
            if node.right:
                q.append((node.right, path))

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
    public int pseudoPalindromicPaths(TreeNode root) {
        int count = 0;
        Queue<Pair> q = new LinkedList<>();
        q.offer(new Pair(root, 0));
        while (!q.isEmpty()) {
            Pair p = q.poll();
            TreeNode node = p.node;
            int path = p.path ^ (1 << node.val);

            if (node.left == null && node.right == null) {
                if ((path & (path - 1)) == 0) {
                    count++;
                }
            } else {
                if (node.left != null) q.offer(new Pair(node.left, path));
                if (node.right != null) q.offer(new Pair(node.right, path));
            }
        }

        return count;
    }

    private static class Pair {
        TreeNode node;
        int path;
        Pair(TreeNode node, int path) {
            this.node = node;
            this.path = path;
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
    int pseudoPalindromicPaths(TreeNode* root) {
        int res = 0;
        queue<pair<TreeNode*, int>> q;
        q.push({root, 0});
        while (!q.empty()) {
            auto [node, path] = q.front();q.pop();
            path ^= (1 << node->val);

            if (!node->left && !node->right) {
                if ((path & (path - 1)) == 0) res++;
                continue;
            }

            if (node->left) q.push({node->left, path});
            if (node->right) q.push({node->right, path});
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
    pseudoPalindromicPaths(root) {
        let res = 0;
        const q = new Queue([[root, 0]]);

        while (!q.isEmpty()) {
            const [node, path] = q.pop();
            const newPath = path ^ (1 << node.val);

            if (!node.left && !node.right) {
                if ((newPath & (newPath - 1)) === 0) res++;
                continue;
            }

            if (node.left) q.push([node.left, newPath]);
            if (node.right) q.push([node.right, newPath]);
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

## 5. Iterative DFS

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def pseudoPalindromicPaths(self, root: Optional[TreeNode]) -> int:
        count = 0
        stack = [(root, 0)]
        while stack:
            node, path = stack.pop()
            path ^= (1 << node.val)

            if not node.left and not node.right:
                if path & (path - 1) == 0:
                    count += 1
            else:
                if node.right:
                    stack.append((node.right, path))
                if node.left:
                    stack.append((node.left, path))

        return count
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
    public int pseudoPalindromicPaths(TreeNode root) {
        int count = 0;
        Stack<Pair> stack = new Stack<>();
        stack.push(new Pair(root, 0));

        while (!stack.isEmpty()) {
            Pair p = stack.pop();
            TreeNode node = p.node;
            int path = p.path ^ (1 << node.val);

            if (node.left == null && node.right == null) {
                if ((path & (path - 1)) == 0) {
                    count++;
                }
            } else {
                if (node.right != null) stack.push(new Pair(node.right, path));
                if (node.left != null) stack.push(new Pair(node.left, path));
            }
        }
        return count;
    }

    private static class Pair {
        TreeNode node;
        int path;
        Pair(TreeNode node, int path) {
            this.node = node;
            this.path = path;
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
    int pseudoPalindromicPaths(TreeNode* root) {
        stack<pair<TreeNode*, int>> s;
        s.push({root, 0});
        int count = 0;

        while (!s.empty()) {
            auto [node, path] = s.top();
            s.pop();
            path ^= (1 << node->val);

            if (!node->left && !node->right) {
                if ((path & (path - 1)) == 0) count++;
            } else {
                if (node->right) s.push({node->right, path});
                if (node->left) s.push({node->left, path});
            }
        }

        return count;
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
    pseudoPalindromicPaths(root) {
        let count = 0;
        const stack = [[root, 0]];

        while (stack.length) {
            const [node, path] = stack.pop();
            const newPath = path ^ (1 << node.val);

            if (!node.left && !node.right) {
                if ((newPath & (newPath - 1)) === 0) count++;
            } else {
                if (node.right) stack.push([node.right, newPath]);
                if (node.left) stack.push([node.left, newPath]);
            }
        }

        return count;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(h)$

> Where $n$ is the number of nodes and $h$ is the height of the given tree.
