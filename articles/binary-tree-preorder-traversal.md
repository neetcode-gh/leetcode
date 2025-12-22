## 1. Depth First Search

### Intuition
Preorder traversal visits nodes in this exact order:

**1. Node itself → 2. Left subtree → 3. Right subtree**

So we simply start at the root and:
- Record its value,
- Recursively explore the left child,
- Then recursively explore the right child.

This naturally follows the preorder definition, and recursion handles the tree structure automatically.

---

### Algorithm
1. Create an empty result list `res`.
2. Define a recursive function:
   - If the node is `null`, return.
   - Add the node’s value to `res`.
   - Recurse on its left child.
   - Recurse on its right child.
3. Call the function starting from the root.
4. Return `res`.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def preorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        res = []

        def preorder(node):
            if not node:
                return

            res.append(node.val)
            preorder(node.left)
            preorder(node.right)

        preorder(root)
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

    public List<Integer> preorderTraversal(TreeNode root) {
        res = new ArrayList<>();
        preorder(root);
        return res;
    }

    private void preorder(TreeNode node) {
        if (node == null) {
            return;
        }
        res.add(node.val);
        preorder(node.left);
        preorder(node.right);
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
    vector<int> preorderTraversal(TreeNode* root) {
        preorder(root);
        return res;
    }

private:
    void preorder(TreeNode* node) {
        if (!node) {
            return;
        }
        res.push_back(node->val);
        preorder(node->left);
        preorder(node->right);
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
    preorderTraversal(root) {
        const res = [];

        const preorder = (node) => {
            if (!node) return;
            res.push(node.val);
            preorder(node.left);
            preorder(node.right);
        };

        preorder(root);
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
    public List<int> PreorderTraversal(TreeNode root) {
        List<int> res = new List<int>();
        Preorder(root, res);
        return res;
    }

    private void Preorder(TreeNode node, List<int> res) {
        if (node == null) return;

        res.Add(node.val);
        Preorder(node.left, res);
        Preorder(node.right, res);
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

## 2. Iterative Depth First Search

### Intuition
Preorder traversal follows the pattern:

**Visit Node → Left → Right**

Using a stack, we can simulate recursion.  
The trick:  
- Whenever we visit a node, we immediately record its value (preorder rule).  
- Then we push the **right child first**, because the stack is LIFO and we want to process the left child next.  
- Move to the left child and repeat.  
- If we reach a null left child, pop from the stack to continue with the right subtree.

This preserves the exact preorder sequence without recursion.

---

### Algorithm
1. Initialize an empty list `res` for the result.
2. Create an empty stack.
3. Set `cur = root`.
4. While `cur` is not null **or** stack is not empty:
   - If `cur` exists:
     - Add `cur.val` to `res`.
     - Push `cur.right` onto the stack.
     - Move `cur` to `cur.left`.
   - Else:
     - Pop from the stack and set `cur` to that node.
5. Return `res`.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def preorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        res = []
        stack = []
        cur = root

        while cur or stack:
            if cur:
                res.append(cur.val)
                stack.append(cur.right)
                cur = cur.left
            else:
                cur = stack.pop()

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
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        Stack<TreeNode> stack = new Stack<>();
        TreeNode cur = root;

        while (cur != null || !stack.isEmpty()) {
            if (cur != null) {
                res.add(cur.val);
                stack.push(cur.right);
                cur = cur.left;
            } else {
                cur = stack.pop();
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
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> res;
        stack<TreeNode*> stack;
        TreeNode* cur = root;

        while (cur || !stack.empty()) {
            if (cur) {
                res.push_back(cur->val);
                stack.push(cur->right);
                cur = cur->left;
            } else {
                cur = stack.top();
                stack.pop();
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
    preorderTraversal(root) {
        const res = [];
        const stack = [];
        let cur = root;

        while (cur || stack.length > 0) {
            if (cur) {
                res.push(cur.val);
                stack.push(cur.right);
                cur = cur.left;
            } else {
                cur = stack.pop();
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
    public List<int> PreorderTraversal(TreeNode root) {
        List<int> res = new List<int>();
        Stack<TreeNode> stack = new Stack<TreeNode>();
        TreeNode cur = root;

        while (cur != null || stack.Count > 0) {
            if (cur != null) {
                res.Add(cur.val);
                stack.Push(cur.right);
                cur = cur.left;
            } else {
                cur = stack.Pop();
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
    - $O(n)$ space for the stack.
    - $O(n)$ space for the output array.

---

## 3. Morris Traversal

### Intuition
Morris Traversal lets us do preorder traversal **without recursion and without a stack**, using **O(1) extra space**.

The key idea:
- For every node with a left child, find its **inorder predecessor** (rightmost node in the left subtree).
- Normally, after finishing the left subtree, we would return back to the root.  
  Since we have no stack, we temporarily **create a thread**:  
  `predecessor.right = current`
- On the first time we reach a node, we **record its value** (because preorder = Node → Left → Right).
- When we come back through the created thread, we **restore the tree** by removing the thread and then continue to the right child.

This modifies the tree temporarily but restores it fully at the end.

---

### Algorithm
1. Initialize `cur = root` and an empty result list `res`.
2. While `cur` is not null:
   - If `cur.left` does NOT exist:
     - Visit `cur` (append value to `res`).
     - Move to `cur.right`.
   - Else:
     - Find the inorder predecessor `prev` (rightmost node in `cur.left`).
     - If `prev.right` is null:
       - This is the **first time** visiting `cur`.  
       - Append `cur.val` to `res`.
       - Create a thread: `prev.right = cur`.
       - Move to `cur.left`.
     - Else:
       - Thread exists → we are returning after finishing the left subtree.
       - Remove the thread: `prev.right = None`.
       - Move to `cur.right`.
3. Return `res`.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def preorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        res = []
        cur = root

        while cur:
            if not cur.left:
                res.append(cur.val)
                cur = cur.right
            else:
                prev = cur.left
                while prev.right and prev.right != cur:
                    prev = prev.right

                if not prev.right:
                    res.append(cur.val)
                    prev.right = cur
                    cur = cur.left
                else:
                    prev.right = None
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
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        TreeNode cur = root;

        while (cur != null) {
            if (cur.left == null) {
                res.add(cur.val);
                cur = cur.right;
            } else {
                TreeNode prev = cur.left;
                while (prev.right != null && prev.right != cur) {
                    prev = prev.right;
                }

                if (prev.right == null) {
                    res.add(cur.val);
                    prev.right = cur;
                    cur = cur.left;
                } else {
                    prev.right = null;
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
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> res;
        TreeNode* cur = root;

        while (cur) {
            if (!cur->left) {
                res.push_back(cur->val);
                cur = cur->right;
            } else {
                TreeNode* prev = cur->left;
                while (prev->right && prev->right != cur) {
                    prev = prev->right;
                }

                if (!prev->right) {
                    res.push_back(cur->val);
                    prev->right = cur;
                    cur = cur->left;
                } else {
                    prev->right = nullptr;
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
     * @return {number[]}
     */
    preorderTraversal(root) {
        const res = [];
        let cur = root;

        while (cur) {
            if (!cur.left) {
                res.push(cur.val);
                cur = cur.right;
            } else {
                let prev = cur.left;
                while (prev.right && prev.right !== cur) {
                    prev = prev.right;
                }

                if (!prev.right) {
                    res.push(cur.val);
                    prev.right = cur;
                    cur = cur.left;
                } else {
                    prev.right = null;
                    cur = cur.right;
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
    public List<int> PreorderTraversal(TreeNode root) {
        List<int> res = new List<int>();
        TreeNode cur = root;

        while (cur != null) {
            if (cur.left == null) {
                res.Add(cur.val);
                cur = cur.right;
            } else {
                TreeNode prev = cur.left;
                while (prev.right != null && prev.right != cur) {
                    prev = prev.right;
                }

                if (prev.right == null) {
                    res.Add(cur.val);
                    prev.right = cur;
                    cur = cur.left;
                } else {
                    prev.right = null;
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
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ space for the output array.
