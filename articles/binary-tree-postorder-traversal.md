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
    def postorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        res = []

        def postorder(node):
            if not node:
                return

            postorder(node.left)
            postorder(node.right)
            res.append(node.val)

        postorder(root)
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
    private List<Integer> res;

    public List<Integer> postorderTraversal(TreeNode root) {
        res = new ArrayList<>();
        postorder(root);
        return res;
    }

    private void postorder(TreeNode node) {
        if (node == null) {
            return;
        }
        postorder(node.left);
        postorder(node.right);
        res.add(node.val);
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
    vector<int> res;

public:
    vector<int> postorderTraversal(TreeNode* root) {
        postorder(root);
        return res;
    }

private:
    void postorder(TreeNode* node) {
        if (!node) {
            return;
        }
        postorder(node->left);
        postorder(node->right);
        res.push_back(node->val);
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
     * @return {number[]}
     */
    postorderTraversal(root) {
        const res = [];

        const postorder = (node) => {
            if (!node) return;
            postorder(node.left);
            postorder(node.right);
            res.push(node.val);
        };

        postorder(root);
        return res;
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
    public List<int> PostorderTraversal(TreeNode root) {
        List<int> res = new List<int>();

        void Postorder(TreeNode node) {
            if (node == null) return;
            Postorder(node.left);
            Postorder(node.right);
            res.Add(node.val);
        }

        Postorder(root);
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(n)$ space for the recursion stack.
    - $O(n)$ space for the output array.

---

## 2. Iterative Depth First Search - I

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def postorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        stack = [root]
        visit = [False]
        res = []

        while stack:
            cur, v = stack.pop(), visit.pop()
            if cur:
                if v:
                    res.append(cur.val)
                else:
                    stack.append(cur)
                    visit.append(True)
                    stack.append(cur.right)
                    visit.append(False)
                    stack.append(cur.left)
                    visit.append(False)

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
    public List<Integer> postorderTraversal(TreeNode root) {
        Stack<TreeNode> stack = new Stack<>();
        Stack<Boolean> visit = new Stack<>();
        List<Integer> res = new ArrayList<>();

        stack.push(root);
        visit.push(false);

        while (!stack.isEmpty()) {
            TreeNode cur = stack.pop();
            boolean v = visit.pop();

            if (cur != null) {
                if (v) {
                    res.add(cur.val);
                } else {
                    stack.push(cur);
                    visit.push(true);
                    stack.push(cur.right);
                    visit.push(false);
                    stack.push(cur.left);
                    visit.push(false);
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
    vector<int> postorderTraversal(TreeNode* root) {
        stack<TreeNode*> stk;
        stack<bool> visit;
        vector<int> res;

        stk.push(root);
        visit.push(false);

        while (!stk.empty()) {
            TreeNode* cur = stk.top();
            bool v = visit.top();
            stk.pop();
            visit.pop();

            if (cur) {
                if (v) {
                    res.push_back(cur->val);
                } else {
                    stk.push(cur);
                    visit.push(true);
                    stk.push(cur->right);
                    visit.push(false);
                    stk.push(cur->left);
                    visit.push(false);
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
     * @return {number[]}
     */
    postorderTraversal(root) {
        const stack = [root];
        const visit = [false];
        const res = [];

        while (stack.length) {
            const cur = stack.pop();
            const v = visit.pop();

            if (cur) {
                if (v) {
                    res.push(cur.val);
                } else {
                    stack.push(cur);
                    visit.push(true);
                    stack.push(cur.right);
                    visit.push(false);
                    stack.push(cur.left);
                    visit.push(false);
                }
            }
        }

        return res;
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
    public List<int> PostorderTraversal(TreeNode root) {
        var stack = new Stack<TreeNode>();
        var visit = new Stack<bool>();
        var res = new List<int>();

        stack.Push(root);
        visit.Push(false);

        while (stack.Count > 0) {
            var cur = stack.Pop();
            var v = visit.Pop();

            if (cur != null) {
                if (v) {
                    res.Add(cur.val);
                } else {
                    stack.Push(cur);
                    visit.Push(true);
                    stack.Push(cur.right);
                    visit.Push(false);
                    stack.Push(cur.left);
                    visit.Push(false);
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
- Space complexity:
    - $O(n)$ space for the stacks.
    - $O(n)$ space for the output array.

---

## 3. Iterative Depth First Search - II

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def postorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        res = []
        stack = []
        cur = root

        while cur or stack:
            if cur:
                res.append(cur.val)
                stack.append(cur)
                cur = cur.right
            else:
                cur = stack.pop()
                cur = cur.left

        res.reverse()
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
    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        Stack<TreeNode> stack = new Stack<>();
        TreeNode cur = root;

        while (cur != null || !stack.isEmpty()) {
            if (cur != null) {
                res.add(cur.val);
                stack.push(cur);
                cur = cur.right;
            } else {
                cur = stack.pop();
                cur = cur.left;
            }
        }

        Collections.reverse(res);
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
    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> res;
        stack<TreeNode*> stack;
        TreeNode* cur = root;

        while (cur || !stack.empty()) {
            if (cur) {
                res.push_back(cur->val);
                stack.push(cur);
                cur = cur->right;
            } else {
                cur = stack.top();
                stack.pop();
                cur = cur->left;
            }
        }

        reverse(res.begin(), res.end());
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
     * @return {number[]}
     */
    postorderTraversal(root) {
        const res = [];
        const stack = [];
        let cur = root;

        while (cur || stack.length) {
            if (cur) {
                res.push(cur.val);
                stack.push(cur);
                cur = cur.right;
            } else {
                cur = stack.pop();
                cur = cur.left;
            }
        }

        res.reverse();
        return res;
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
    public List<int> PostorderTraversal(TreeNode root) {
        List<int> res = new List<int>();
        Stack<TreeNode> stack = new Stack<TreeNode>();
        TreeNode cur = root;

        while (cur != null || stack.Count > 0) {
            if (cur != null) {
                res.Add(cur.val);
                stack.Push(cur);
                cur = cur.right;
            } else {
                cur = stack.Pop();
                cur = cur.left;
            }
        }

        res.Reverse();
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(n)$ space for the stack.
    - $O(n)$ space for the output array.

---

## 4. Morris Traversal

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def postorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        res = []
        cur = root

        while cur:
            if not cur.right:
                res.append(cur.val)
                cur = cur.left
            else:
                prev = cur.right
                while prev.left and prev.left != cur:
                    prev = prev.left

                if not prev.left:
                    res.append(cur.val)
                    prev.left = cur
                    cur = cur.right
                else:
                    prev.left = None
                    cur = cur.left

        res.reverse()
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
    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        TreeNode cur = root;

        while (cur != null) {
            if (cur.right == null) {
                res.add(cur.val);
                cur = cur.left;
            } else {
                TreeNode prev = cur.right;
                while (prev.left != null && prev.left != cur) {
                    prev = prev.left;
                }

                if (prev.left == null) {
                    res.add(cur.val);
                    prev.left = cur;
                    cur = cur.right;
                } else {
                    prev.left = null;
                    cur = cur.left;
                }
            }
        }

        Collections.reverse(res);
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
    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> res;
        TreeNode* cur = root;

        while (cur) {
            if (!cur->right) {
                res.push_back(cur->val);
                cur = cur->left;
            } else {
                TreeNode* prev = cur->right;
                while (prev->left && prev->left != cur) {
                    prev = prev->left;
                }

                if (!prev->left) {
                    res.push_back(cur->val);
                    prev->left = cur;
                    cur = cur->right;
                } else {
                    prev->left = nullptr;
                    cur = cur->left;
                }
            }
        }

        reverse(res.begin(), res.end());
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
     * @return {number[]}
     */
    postorderTraversal(root) {
        const res = [];
        let cur = root;

        while (cur) {
            if (!cur.right) {
                res.push(cur.val);
                cur = cur.left;
            } else {
                let prev = cur.right;
                while (prev.left && prev.left !== cur) {
                    prev = prev.left;
                }

                if (!prev.left) {
                    res.push(cur.val);
                    prev.left = cur;
                    cur = cur.right;
                } else {
                    prev.left = null;
                    cur = cur.left;
                }
            }
        }

        res.reverse();
        return res;
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
    public List<int> PostorderTraversal(TreeNode root) {
        List<int> res = new List<int>();
        TreeNode cur = root;

        while (cur != null) {
            if (cur.right == null) {
                res.Add(cur.val);
                cur = cur.left;
            } else {
                TreeNode prev = cur.right;
                while (prev.left != null && prev.left != cur) {
                    prev = prev.left;
                }

                if (prev.left == null) {
                    res.Add(cur.val);
                    prev.left = cur;
                    cur = cur.right;
                } else {
                    prev.left = null;
                    cur = cur.left;
                }
            }
        }

        res.Reverse();
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ space for the output array.
