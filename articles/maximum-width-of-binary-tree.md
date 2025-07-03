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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
