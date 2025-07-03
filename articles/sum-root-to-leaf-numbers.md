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
    def sumNumbers(self, root: TreeNode) -> int:
        def dfs(cur, num):
            if not cur:
                return 0

            num = num * 10 + cur.val
            if not cur.left and not cur.right:
                return num
            return dfs(cur.left, num) + dfs(cur.right, num)

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
    public int sumNumbers(TreeNode root) {
        return dfs(root, 0);
    }

    private int dfs(TreeNode cur, int num) {
        if (cur == null) return 0;

        num = num * 10 + cur.val;
        if (cur.left == null && cur.right == null) return num;

        return dfs(cur.left, num) + dfs(cur.right, num);
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
    int sumNumbers(TreeNode* root) {
        return dfs(root, 0);
    }

private:
    int dfs(TreeNode* cur, int num) {
        if (!cur) return 0;

        num = num * 10 + cur->val;
        if (!cur->left && !cur->right) return num;

        return dfs(cur->left, num) + dfs(cur->right, num);
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
    sumNumbers(root) {
        const dfs = (cur, num) => {
            if (!cur) return 0;

            num = num * 10 + cur.val;
            if (!cur.left && !cur.right) return num;

            return dfs(cur.left, num) + dfs(cur.right, num);
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

## 2. Breadth First Search

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def sumNumbers(self, root: TreeNode) -> int:
        res = 0
        q = deque([(root, 0)])
        while q:
            cur, num = q.popleft()
            num = num * 10 + cur.val
            if not cur.left and not cur.right:
                res += num
                continue

            if cur.left:
                q.append((cur.left, num))
            if cur.right:
                q.append((cur.right, num))

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
    public int sumNumbers(TreeNode root) {
        int res = 0;
        Queue<Pair<TreeNode, Integer>> q = new LinkedList<>();
        q.offer(new Pair<>(root, 0));
        while (!q.isEmpty()) {
            Pair<TreeNode, Integer> p = q.poll();
            TreeNode cur = p.getKey();
            int num = p.getValue() * 10 + cur.val;
            if (cur.left == null && cur.right == null) {
                res += num;
                continue;
            }

            if (cur.left != null) q.offer(new Pair<>(cur.left, num));
            if (cur.right != null) q.offer(new Pair<>(cur.right, num));
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
    int sumNumbers(TreeNode* root) {
        int res = 0;
        queue<pair<TreeNode*, int>> q;
        q.push({root, 0});
        while (!q.empty()) {
            auto [cur, num] = q.front();q.pop();
            num = num * 10 + cur->val;
            if (!cur->left && !cur->right) {
                res += num;
                continue;
            }

            if (cur->left) q.push({cur->left, num});
            if (cur->right) q.push({cur->right, num});
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
    sumNumbers(root) {
        let res = 0;
        const q = new Queue([[root, 0]]);
        while (!q.isEmpty()) {
            const [cur, num] = q.pop();
            const newNum = num * 10 + cur.val;
            if (!cur.left && !cur.right) {
                res += newNum;
                continue;
            }

            if (cur.left) q.push([cur.left, newNum]);
            if (cur.right) q.push([cur.right, newNum]);
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

## 3. Iterative DFS

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def sumNumbers(self, root: Optional[TreeNode]) -> int:
        res = 0
        stack = []
        cur, num = root, 0

        while cur or stack:
            if cur:
                num = num * 10 + cur.val
                if not cur.left and not cur.right:
                    res += num

                stack.append((cur.right, num))
                cur = cur.left
            else:
                cur, num = stack.pop()

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
    public int sumNumbers(TreeNode root) {
        int res = 0, num = 0;
        Stack<Pair<TreeNode, Integer>> stack = new Stack<>();
        TreeNode cur = root;

        while (cur != null || !stack.isEmpty()) {
            if (cur != null) {
                num = num * 10 + cur.val;
                if (cur.left == null && cur.right == null)
                    res += num;

                stack.push(new Pair<>(cur.right, num));
                cur = cur.left;
            } else {
                Pair<TreeNode, Integer> p = stack.pop();
                cur = p.getKey();
                num = p.getValue();
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
    int sumNumbers(TreeNode* root) {
        int res = 0;
        stack<pair<TreeNode*, int>> st;
        TreeNode* cur = root;
        int num = 0;

        while (cur || !st.empty()) {
            if (cur) {
                num = num * 10 + cur->val;
                if (!cur->left && !cur->right)
                    res += num;

                st.push({cur->right, num});
                cur = cur->left;
            } else {
                cur = st.top().first;
                num = st.top().second;
                st.pop();
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
    sumNumbers(root) {
        let res = 0,
            num = 0;
        let stack = [];
        let cur = root;

        while (cur || stack.length) {
            if (cur) {
                num = num * 10 + cur.val;
                if (!cur.left && !cur.right) res += num;

                stack.push([cur.right, num]);
                cur = cur.left;
            } else {
                [cur, num] = stack.pop();
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(h)$

> Where $n$ is the number of nodes and $h$ is the height of the given tree.

---

## 4. Morris Travrsal

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def sumNumbers(self, root: Optional[TreeNode]) -> int:
        res = 0
        cur = root
        num = 0
        power = [1] * 10
        for i in range(1, 10):
            power[i] *= power[i - 1] * 10

        while cur:
            if not cur.left:
                num = num * 10 + cur.val
                if not cur.right:
                    res += num
                cur = cur.right
            else:
                prev = cur.left
                steps = 1
                while prev.right and prev.right != cur:
                    prev = prev.right
                    steps += 1

                if not prev.right:
                    prev.right = cur
                    num = num * 10 + cur.val
                    cur = cur.left
                else:
                    prev.right = None
                    if not prev.left:
                        res += num
                    num //= power[steps]
                    cur = cur.right

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
    public int sumNumbers(TreeNode root) {
        int res = 0, num = 0;
        int[] power = new int[10];
        power[0] = 1;
        for (int i = 1; i < 10; i++) {
            power[i] = power[i - 1] * 10;
        }

        TreeNode cur = root;
        while (cur != null) {
            if (cur.left == null) {
                num = num * 10 + cur.val;
                if (cur.right == null) res += num;
                cur = cur.right;
            } else {
                TreeNode prev = cur.left;
                int steps = 1;
                while (prev.right != null && prev.right != cur) {
                    prev = prev.right;
                    steps++;
                }

                if (prev.right == null) {
                    prev.right = cur;
                    num = num * 10 + cur.val;
                    cur = cur.left;
                } else {
                    prev.right = null;
                    if (prev.left == null) res += num;
                    num /= power[steps];
                    cur = cur.right;
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
    int sumNumbers(TreeNode* root) {
        int res = 0, num = 0;
        int power[10] = {1};
        for (int i = 1; i < 10; i++) {
            power[i] = power[i - 1] * 10;
        }

        TreeNode* cur = root;
        while (cur) {
            if (!cur->left) {
                num = num * 10 + cur->val;
                if (!cur->right) res += num;
                cur = cur->right;
            } else {
                TreeNode* prev = cur->left;
                int steps = 1;
                while (prev->right && prev->right != cur) {
                    prev = prev->right;
                    steps++;
                }

                if (!prev->right) {
                    prev->right = cur;
                    num = num * 10 + cur->val;
                    cur = cur->left;
                } else {
                    prev->right = nullptr;
                    if (!prev->left) res += num;
                    num /= power[steps];
                    cur = cur->right;
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
    sumNumbers(root) {
        let res = 0,
            num = 0;
        let power = Array(10).fill(1);
        for (let i = 1; i < 10; i++) {
            power[i] = power[i - 1] * 10;
        }

        let cur = root;
        while (cur) {
            if (!cur.left) {
                num = num * 10 + cur.val;
                if (!cur.right) res += num;
                cur = cur.right;
            } else {
                let prev = cur.left,
                    steps = 1;
                while (prev.right && prev.right !== cur) {
                    prev = prev.right;
                    steps++;
                }

                if (!prev.right) {
                    prev.right = cur;
                    num = num * 10 + cur.val;
                    cur = cur.left;
                } else {
                    prev.right = null;
                    if (!prev.left) res += num;
                    num = Math.floor(num / power[steps]);
                    cur = cur.right;
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
- Space complexity: $O(1)$ extra space.
