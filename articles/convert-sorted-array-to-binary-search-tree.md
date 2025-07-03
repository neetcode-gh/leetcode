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
    def sortedArrayToBST(self, nums: List[int]) -> Optional[TreeNode]:
        if not nums:
            return None

        mid = len(nums) // 2
        root = TreeNode(nums[mid])
        root.left = self.sortedArrayToBST(nums[:mid])
        root.right = self.sortedArrayToBST(nums[mid + 1:])
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
    public TreeNode sortedArrayToBST(int[] nums) {
        if (nums.length == 0) {
            return null;
        }

        int mid = nums.length / 2;
        TreeNode root = new TreeNode(nums[mid]);
        root.left = sortedArrayToBST(Arrays.copyOfRange(nums, 0, mid));
        root.right = sortedArrayToBST(Arrays.copyOfRange(nums, mid + 1, nums.length));
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
    TreeNode* sortedArrayToBST(vector<int>& nums) {
        if (nums.empty()) {
            return nullptr;
        }

        int mid = nums.size() / 2;
        TreeNode* root = new TreeNode(nums[mid]);
        vector<int> left(nums.begin(), nums.begin() + mid);
        vector<int> right(nums.begin() + mid + 1, nums.end());
        root->left = sortedArrayToBST(left);
        root->right = sortedArrayToBST(right);
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
     * @param {number[]} nums
     * @return {TreeNode}
     */
    sortedArrayToBST(nums) {
        if (nums.length === 0) {
            return null;
        }

        const mid = Math.floor(nums.length / 2);
        const root = new TreeNode(nums[mid]);
        root.left = this.sortedArrayToBST(nums.slice(0, mid));
        root.right = this.sortedArrayToBST(nums.slice(mid + 1));
        return root;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

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
    def sortedArrayToBST(self, nums: List[int]) -> TreeNode:
        def helper(l, r):
            if l > r:
                return None
            m = (l + r) // 2
            root = TreeNode(nums[m])
            root.left = helper(l, m - 1)
            root.right = helper(m + 1, r)
            return root

        return helper(0, len(nums) - 1)
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
    public TreeNode sortedArrayToBST(int[] nums) {
        return helper(nums, 0, nums.length - 1);
    }

    private TreeNode helper(int[] nums, int l, int r) {
        if (l > r) {
            return null;
        }
        int m = (l + r) / 2;
        TreeNode root = new TreeNode(nums[m]);
        root.left = helper(nums, l, m - 1);
        root.right = helper(nums, m + 1, r);
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
    TreeNode* sortedArrayToBST(vector<int>& nums) {
        return helper(nums, 0, nums.size() - 1);
    }

private:
    TreeNode* helper(vector<int>& nums, int l, int r) {
        if (l > r) {
            return nullptr;
        }
        int m = (l + r) / 2;
        TreeNode* root = new TreeNode(nums[m]);
        root->left = helper(nums, l, m - 1);
        root->right = helper(nums, m + 1, r);
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
     * @param {number[]} nums
     * @return {TreeNode}
     */
    sortedArrayToBST(nums) {
        const helper = (l, r) => {
            if (l > r) {
                return null;
            }
            const m = Math.floor((l + r) / 2);
            const root = new TreeNode(nums[m]);
            root.left = helper(l, m - 1);
            root.right = helper(m + 1, r);
            return root;
        };

        return helper(0, nums.length - 1);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(\log n)$ space for recursion stack.
    - $O(n)$ space for the output.

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
    def sortedArrayToBST(self, nums: List[int]) -> TreeNode:
        if not nums:
            return None

        root = TreeNode(0)
        stack = [(root, 0, len(nums) - 1)]

        while stack:
            node, l, r = stack.pop()
            m = (l + r) // 2
            node.val = nums[m]
            if l <= m - 1:
                node.left = TreeNode(0)
                stack.append((node.left, l, m - 1))
            if m + 1 <= r:
                node.right = TreeNode(0)
                stack.append((node.right, m + 1, r))

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
    public TreeNode sortedArrayToBST(int[] nums) {
        if (nums.length == 0) {
            return null;
        }

        TreeNode root = new TreeNode(0);
        Stack<int[]> stack = new Stack<>();
        Stack<TreeNode> nodes = new Stack<>();
        stack.push(new int[]{0, nums.length - 1});
        nodes.push(root);

        while (!stack.isEmpty()) {
            int[] range = stack.pop();
            TreeNode node = nodes.pop();
            int l = range[0], r = range[1];
            int m = (l + r) / 2;
            node.val = nums[m];

            if (l <= m - 1) {
                node.left = new TreeNode(0);
                stack.push(new int[]{l, m - 1});
                nodes.push(node.left);
            }
            if (m + 1 <= r) {
                node.right = new TreeNode(0);
                stack.push(new int[]{m + 1, r});
                nodes.push(node.right);
            }
        }

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
    TreeNode* sortedArrayToBST(vector<int>& nums) {
        if (nums.empty()) return nullptr;

        TreeNode* root = new TreeNode(0);
        stack<tuple<TreeNode*, int, int>> stack;
        stack.push({root, 0, (int)nums.size() - 1});

        while (!stack.empty()) {
            auto [node, l, r] = stack.top();
            stack.pop();
            int m = (l + r) / 2;
            node->val = nums[m];

            if (l <= m - 1) {
                node->left = new TreeNode(0);
                stack.push({node->left, l, m - 1});
            }
            if (m + 1 <= r) {
                node->right = new TreeNode(0);
                stack.push({node->right, m + 1, r});
            }
        }

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
     * @param {number[]} nums
     * @return {TreeNode}
     */
    sortedArrayToBST(nums) {
        if (nums.length === 0) {
            return null;
        }

        const root = new TreeNode(0);
        const stack = [[root, 0, nums.length - 1]];

        while (stack.length) {
            const [node, l, r] = stack.pop();
            const m = Math.floor((l + r) / 2);
            node.val = nums[m];

            if (l <= m - 1) {
                node.left = new TreeNode(0);
                stack.push([node.left, l, m - 1]);
            }
            if (m + 1 <= r) {
                node.right = new TreeNode(0);
                stack.push([node.right, m + 1, r]);
            }
        }

        return root;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(\log n)$ space for the stack.
    - $O(n)$ space for the output.
