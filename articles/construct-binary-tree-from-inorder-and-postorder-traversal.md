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
    def buildTree(self, inorder: List[int], postorder: List[int]) -> Optional[TreeNode]:
        if not postorder or not inorder:
            return None

        root = TreeNode(postorder[-1])
        mid = inorder.index(postorder[-1])
        root.left = self.buildTree(inorder[:mid], postorder[:mid])
        root.right = self.buildTree(inorder[mid + 1:], postorder[mid:-1])
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
    public TreeNode buildTree(int[] inorder, int[] postorder) {
        if (postorder.length == 0 || inorder.length == 0) {
            return null;
        }

        TreeNode root = new TreeNode(postorder[postorder.length - 1]);
        int mid = 0;
        for (int i = 0; i < inorder.length; i++) {
            if (inorder[i] == postorder[postorder.length - 1]) {
                mid = i;
                break;
            }
        }

        root.left = buildTree(
            Arrays.copyOfRange(inorder, 0, mid),
            Arrays.copyOfRange(postorder, 0, mid)
        );
        root.right = buildTree(
            Arrays.copyOfRange(inorder, mid + 1, inorder.length),
            Arrays.copyOfRange(postorder, mid, postorder.length - 1)
        );

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
    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        if (postorder.empty() || inorder.empty()) {
            return nullptr;
        }

        TreeNode* root = new TreeNode(postorder.back());
        auto it = find(inorder.begin(), inorder.end(), postorder.back());
        int mid = distance(inorder.begin(), it);

        vector<int> leftInorder(inorder.begin(), inorder.begin() + mid);
        vector<int> rightInorder(inorder.begin() + mid + 1, inorder.end());
        vector<int> leftPostorder(postorder.begin(), postorder.begin() + mid);
        vector<int> rightPostorder(postorder.begin() + mid, postorder.end() - 1);

        root->left = buildTree(leftInorder, leftPostorder);
        root->right = buildTree(rightInorder, rightPostorder);

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
     * @param {number[]} inorder
     * @param {number[]} postorder
     * @return {TreeNode}
     */
    buildTree(inorder, postorder) {
        if (postorder.length === 0 || inorder.length === 0) {
            return null;
        }

        const rootVal = postorder[postorder.length - 1];
        const root = new TreeNode(rootVal);
        const mid = inorder.indexOf(rootVal);

        root.left = this.buildTree(
            inorder.slice(0, mid),
            postorder.slice(0, mid),
        );
        root.right = this.buildTree(
            inorder.slice(mid + 1),
            postorder.slice(mid, postorder.length - 1),
        );

        return root;
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
    public TreeNode BuildTree(int[] inorder, int[] postorder) {
        if (postorder.Length == 0 || inorder.Length == 0) {
            return null;
        }

        int rootVal = postorder[postorder.Length - 1];
        TreeNode root = new TreeNode(rootVal);

        int mid = Array.IndexOf(inorder, rootVal);

        int[] leftInorder = inorder[..mid];
        int[] rightInorder = inorder[(mid + 1)..];

        int[] leftPostorder = postorder[..mid];
        int[] rightPostorder = postorder[mid..^1];

        root.left = BuildTree(leftInorder, leftPostorder);
        root.right = BuildTree(rightInorder, rightPostorder);

        return root;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Hash Map + Depth First Search

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def buildTree(self, inorder: List[int], postorder: List[int]) -> Optional[TreeNode]:
        inorderIdx = {v: i for i, v in enumerate(inorder)}

        def dfs(l, r):
            if l > r:
                return None

            root = TreeNode(postorder.pop())
            idx = inorderIdx[root.val]
            root.right = dfs(idx + 1, r)
            root.left = dfs(l, idx - 1)
            return root

        return dfs(0, len(inorder) - 1)
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
    private HashMap<Integer, Integer> inorderIdx;
    private int postIdx;

    public TreeNode buildTree(int[] inorder, int[] postorder) {
        inorderIdx = new HashMap<>();
        for (int i = 0; i < inorder.length; i++) {
            inorderIdx.put(inorder[i], i);
        }
        postIdx = postorder.length - 1;

        return dfs(0, inorder.length - 1, postorder);
    }

    private TreeNode dfs(int l, int r, int[] postorder) {
        if (l > r) {
            return null;
        }

        TreeNode root = new TreeNode(postorder[postIdx--]);
        int idx = inorderIdx.get(root.val);
        root.right = dfs(idx + 1, r, postorder);
        root.left = dfs(l, idx - 1, postorder);
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
    unordered_map<int, int> inorderIdx;
    int postIdx;

    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        for (int i = 0; i < inorder.size(); i++) {
            inorderIdx[inorder[i]] = i;
        }
        postIdx = postorder.size() - 1;

        return dfs(0, inorder.size() - 1, postorder);
    }

private:
    TreeNode* dfs(int l, int r, vector<int>& postorder) {
        if (l > r) {
            return nullptr;
        }

        TreeNode* root = new TreeNode(postorder[postIdx--]);
        int idx = inorderIdx[root->val];
        root->right = dfs(idx + 1, r, postorder);
        root->left = dfs(l, idx - 1, postorder);
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
     * @param {number[]} inorder
     * @param {number[]} postorder
     * @return {TreeNode}
     */
    buildTree(inorder, postorder) {
        const inorderIdx = new Map();
        inorder.forEach((val, idx) => inorderIdx.set(val, idx));
        let postIdx = postorder.length - 1;

        const dfs = (l, r) => {
            if (l > r) return null;

            const root = new TreeNode(postorder[postIdx--]);
            const idx = inorderIdx.get(root.val);
            root.right = dfs(idx + 1, r);
            root.left = dfs(l, idx - 1);
            return root;
        };

        return dfs(0, inorder.length - 1);
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
    int[] postorder;
    Dictionary<int, int> inorderIdx;
    int idx;

    public TreeNode BuildTree(int[] inorder, int[] postorder) {
        this.postorder = postorder;
        inorderIdx = new Dictionary<int, int>();
        for (int i = 0; i < inorder.Length; i++) {
            inorderIdx[inorder[i]] = i;
        }
        idx = postorder.Length - 1;
        return Dfs(0, inorder.Length - 1);
    }

    private TreeNode Dfs(int l, int r) {
        if (l > r) return null;

        TreeNode root = new TreeNode(postorder[idx--]);
        int i = inorderIdx[root.val];
        root.right = Dfs(i + 1, r);
        root.left = Dfs(l, i - 1);
        return root;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Depth First Search (Optimal)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def buildTree(self, inorder: List[int], postorder: List[int]) -> Optional[TreeNode]:
        postIdx = inIdx = len(postorder) - 1
        def dfs(limit):
            nonlocal postIdx, inIdx
            if postIdx < 0:
                return None
            if inorder[inIdx] == limit:
                inIdx -= 1
                return None

            root = TreeNode(postorder[postIdx])
            postIdx -= 1
            root.right = dfs(root.val)
            root.left = dfs(limit)
            return root
        return dfs(float('inf'))
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
    private int postIdx;
    private int inIdx;

    public TreeNode buildTree(int[] inorder, int[] postorder) {
        postIdx = postorder.length - 1;
        inIdx = inorder.length - 1;

        return dfs(postorder, inorder, Integer.MAX_VALUE);
    }

    private TreeNode dfs(int[] postorder, int[] inorder, int limit) {
        if (postIdx < 0) {
            return null;
        }

        if (inorder[inIdx] == limit) {
            inIdx--;
            return null;
        }

        TreeNode root = new TreeNode(postorder[postIdx--]);
        root.right = dfs(postorder, inorder, root.val);
        root.left = dfs(postorder, inorder, limit);
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
    int postIdx;
    int inIdx;

    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        postIdx = postorder.size() - 1;
        inIdx = inorder.size() - 1;

        return dfs(postorder, inorder, numeric_limits<int>::max());
    }

private:
    TreeNode* dfs(vector<int>& postorder, vector<int>& inorder, int limit) {
        if (postIdx < 0) {
            return nullptr;
        }

        if (inorder[inIdx] == limit) {
            inIdx--;
            return nullptr;
        }

        TreeNode* root = new TreeNode(postorder[postIdx--]);
        root->right = dfs(postorder, inorder, root->val);
        root->left = dfs(postorder, inorder, limit);
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
     * @param {number[]} inorder
     * @param {number[]} postorder
     * @return {TreeNode}
     */
    buildTree(inorder, postorder) {
        let postIdx = postorder.length - 1;
        let inIdx = inorder.length - 1;

        const dfs = (limit) => {
            if (postIdx < 0) return null;

            if (inorder[inIdx] === limit) {
                inIdx--;
                return null;
            }

            const root = new TreeNode(postorder[postIdx--]);
            root.right = dfs(root.val);
            root.left = dfs(limit);
            return root;
        };

        return dfs(Infinity);
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
    int postIdx, inIdx;
    int[] inorder, postorder;

    public TreeNode BuildTree(int[] inorder, int[] postorder) {
        this.inorder = inorder;
        this.postorder = postorder;
        postIdx = inIdx = postorder.Length - 1;
        return Dfs(int.MaxValue);
    }

    private TreeNode Dfs(int limit) {
        if (postIdx < 0) return null;
        if (inorder[inIdx] == limit) {
            inIdx--;
            return null;
        }

        TreeNode root = new TreeNode(postorder[postIdx--]);
        root.right = Dfs(root.val);
        root.left = Dfs(limit);
        return root;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.