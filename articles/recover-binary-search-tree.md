## 1. Brute Force

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def recoverTree(self, root: Optional[TreeNode]) -> None:
        """
        Do not return anything, modify root in-place instead.
        """
        def isBST(node):
            if not node:
                return True

            q = deque([(node, float("-inf"), float("inf"))])
            while q:
                cur, left, right = q.popleft()
                if not (left < cur.val < right):
                    return False
                if cur.left:
                    q.append((cur.left, left, cur.val))
                if cur.right:
                    q.append((cur.right, cur.val, right))

            return True

        def dfs1(node1, node2):
            if not node2 or node1 == node2:
                return False
            
            node1.val, node2.val = node2.val, node1.val
            if isBST(root):
                return True
            
            node1.val, node2.val = node2.val, node1.val
            return dfs1(node1, node2.left) or dfs1(node1, node2.right)


        def dfs(node):
            if not node:
                return False
            
            if dfs1(node, root):
                return True
            
            return dfs(node.left) or dfs(node.right)
        
        dfs(root)
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
    public void recoverTree(TreeNode root) {
        dfs(root, root);
    }

    private boolean dfs(TreeNode node1, TreeNode root) {
        if (node1 == null) return false;
        if (dfs1(node1, root, root)) return true;
        return dfs(node1.left, root) || dfs(node1.right, root);
    }

    private boolean dfs1(TreeNode node1, TreeNode node2, TreeNode root) {
        if (node2 == null || node1 == node2) return false;

        swap(node1, node2);
        if (isBST(root)) return true;
        swap(node1, node2);

        return dfs1(node1, node2.left, root) || dfs1(node1, node2.right, root);
    }

    private boolean isBST(TreeNode node) {
        Queue<Object[]> q = new LinkedList<>();
        q.offer(new Object[]{node, Long.MIN_VALUE, Long.MAX_VALUE});

        while (!q.isEmpty()) {
            Object[] curr = q.poll();
            TreeNode n = (TreeNode) curr[0];
            long left = (long) curr[1];
            long right = (long) curr[2];

            if (n == null) continue;
            if (n.val <= left || n.val >= right) return false;

            q.offer(new Object[]{n.left, left, (long) n.val});
            q.offer(new Object[]{n.right, (long) n.val, right});
        }

        return true;
    }

    private void swap(TreeNode a, TreeNode b) {
        int tmp = a.val;
        a.val = b.val;
        b.val = tmp;
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
    void recoverTree(TreeNode* root) {
        dfs(root, root, root);
    }

    bool dfs(TreeNode* node1, TreeNode* node2, TreeNode* root) {
        if (!node1) return false;
        if (dfs1(node1, node2, root)) return true;
        return dfs(node1->left, node2, root) || dfs(node1->right, node2, root);
    }

    bool dfs1(TreeNode* node1, TreeNode* node2, TreeNode* root) {
        if (!node2 || node1 == node2) return false;

        swap(node1->val, node2->val);
        if (isBST(root)) return true;
        swap(node1->val, node2->val);

        return dfs1(node1, node2->left, root) || dfs1(node1, node2->right, root);
    }

    bool isBST(TreeNode* node) {
        TreeNode* prev = nullptr;
        return inorder(node, prev);
    }

    bool inorder(TreeNode* node, TreeNode*& prev) {
        if (!node) return true;
        if (!inorder(node->left, prev)) return false;
        if (prev && prev->val >= node->val) return false;
        prev = node;
        return inorder(node->right, prev);
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
     * @return {void} Do not return anything, modify root in-place instead.
     */
    recoverTree(root) {
        const isBST = (node) => {
            const q = [[node, -Infinity, Infinity]];
            while (q.length) {
                const [cur, left, right] = q.shift();
                if (!cur) continue;
                if (!(left < cur.val && cur.val < right)) return false;
                q.push([cur.left, left, cur.val]);
                q.push([cur.right, cur.val, right]);
            }
            return true;
        };

        const dfs1 = (node1, node2) => {
            if (!node2 || node1 === node2) return false;
            [node1.val, node2.val] = [node2.val, node1.val];
            if (isBST(root)) return true;
            [node1.val, node2.val] = [node2.val, node1.val];
            return dfs1(node1, node2.left) || dfs1(node1, node2.right);
        };

        const dfs = (node) => {
            if (!node) return false;
            if (dfs1(node, root)) return true;
            return dfs(node.left) || dfs(node.right);
        };

        dfs(root);
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
    public void RecoverTree(TreeNode root) {
        Dfs(root, root);
    }

    private bool Dfs(TreeNode node1, TreeNode root) {
        if (node1 == null) return false;
        if (Dfs1(node1, root, root)) return true;
        return Dfs(node1.left, root) || Dfs(node1.right, root);
    }

    private bool Dfs1(TreeNode node1, TreeNode node2, TreeNode root) {
        if (node2 == null || node1 == node2) return false;

        Swap(node1, node2);
        if (IsBST(root)) return true;
        Swap(node1, node2);

        return Dfs1(node1, node2.left, root) || Dfs1(node1, node2.right, root);
    }

    private bool IsBST(TreeNode node) {
        var q = new Queue<(TreeNode node, long min, long max)>();
        q.Enqueue((node, long.MinValue, long.MaxValue));

        while (q.Count > 0) {
            var (cur, min, max) = q.Dequeue();
            if (cur == null) continue;
            long val = cur.val;
            if (val <= min || val >= max) return false;

            q.Enqueue((cur.left, min, val));
            q.Enqueue((cur.right, val, max));
        }
        return true;
    }

    private void Swap(TreeNode a, TreeNode b) {
        int temp = a.val;
        a.val = b.val;
        b.val = temp;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(n)$

---

## 2. Inorder Traversal

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def recoverTree(self, root: Optional[TreeNode]) -> None:
        """
        Do not return anything, modify root in-place instead.
        """
        arr = []
        def inorder(node):
            if not node:
                return
            
            inorder(node.left)
            arr.append(node)
            inorder(node.right)

        inorder(root)
        node1, node2 = None, None

        for i in range(len(arr) - 1):
            if arr[i].val > arr[i + 1].val:
                node2 = arr[i + 1]
                if node1 is None:
                    node1 = arr[i]
                else:
                    break
        node1.val, node2.val = node2.val, node1.val
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
    public void recoverTree(TreeNode root) {
        List<TreeNode> arr = new ArrayList<>();
        inorder(root, arr);

        TreeNode node1 = null, node2 = null;
        for (int i = 0; i < arr.size() - 1; i++) {
            if (arr.get(i).val > arr.get(i + 1).val) {
                node2 = arr.get(i + 1);
                if (node1 == null) node1 = arr.get(i);
                else break;
            }
        }

        int temp = node1.val;
        node1.val = node2.val;
        node2.val = temp;
    }

    private void inorder(TreeNode node, List<TreeNode> arr) {
        if (node == null) return;
        inorder(node.left, arr);
        arr.add(node);
        inorder(node.right, arr);
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
    void recoverTree(TreeNode* root) {
        vector<TreeNode*> arr;
        inorder(root, arr);

        TreeNode* node1 = nullptr;
        TreeNode* node2 = nullptr;

        for (int i = 0; i < arr.size() - 1; i++) {
            if (arr[i]->val > arr[i + 1]->val) {
                node2 = arr[i + 1];
                if (!node1) node1 = arr[i];
                else break;
            }
        }

        swap(node1->val, node2->val);
    }

    void inorder(TreeNode* node, vector<TreeNode*>& arr) {
        if (!node) return;
        inorder(node->left, arr);
        arr.push_back(node);
        inorder(node->right, arr);
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
     * @return {void} Do not return anything, modify root in-place instead.
     */
    recoverTree(root) {
        const arr = [];

        const inorder = node => {
            if (!node) return;
            inorder(node.left);
            arr.push(node);
            inorder(node.right);
        };

        inorder(root);

        let node1 = null, node2 = null;
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i].val > arr[i + 1].val) {
                node2 = arr[i + 1];
                if (node1 === null) node1 = arr[i];
                else break;
            }
        }

        [node1.val, node2.val] = [node2.val, node1.val];
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
    public void RecoverTree(TreeNode root) {
        var arr = new List<TreeNode>();
        Inorder(root, arr);

        TreeNode node1 = null, node2 = null;
        for (int i = 0; i < arr.Count - 1; i++) {
            if (arr[i].val > arr[i + 1].val) {
                node2 = arr[i + 1];
                if (node1 == null) node1 = arr[i];
                else break;
            }
        }

        int temp = node1.val;
        node1.val = node2.val;
        node2.val = temp;
    }

    private void Inorder(TreeNode node, List<TreeNode> arr) {
        if (node == null) return;
        Inorder(node.left, arr);
        arr.Add(node);
        Inorder(node.right, arr);
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 3. Iterative Inorder Traversal

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def recoverTree(self, root: Optional[TreeNode]) -> None:
        stack = []
        node1 = node2 = prev = None
        curr = root

        while stack or curr:
            while curr:
                stack.append(curr)
                curr = curr.left

            curr = stack.pop()
            if prev and prev.val > curr.val:
                node2 = curr
                if not node1:
                    node1 = prev
                else:
                    break
            prev = curr
            curr = curr.right

        node1.val, node2.val = node2.val, node1.val
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
    public void recoverTree(TreeNode root) {
        Stack<TreeNode> stack = new Stack<>();
        TreeNode node1 = null, node2 = null, prev = null, curr = root;

        while (!stack.isEmpty() || curr != null) {
            while (curr != null) {
                stack.push(curr);
                curr = curr.left;
            }

            curr = stack.pop();
            if (prev != null && prev.val > curr.val) {
                node2 = curr;
                if (node1 == null) node1 = prev;
                else break;
            }
            prev = curr;
            curr = curr.right;
        }

        int temp = node1.val;
        node1.val = node2.val;
        node2.val = temp;
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
    void recoverTree(TreeNode* root) {
        stack<TreeNode*> stack;
        TreeNode *node1 = nullptr, *node2 = nullptr, *prev = nullptr, *curr = root;

        while (!stack.empty() || curr) {
            while (curr) {
                stack.push(curr);
                curr = curr->left;
            }

            curr = stack.top(); stack.pop();
            if (prev && prev->val > curr->val) {
                node2 = curr;
                if (!node1) node1 = prev;
                else break;
            }
            prev = curr;
            curr = curr->right;
        }

        swap(node1->val, node2->val);
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
     * @return {void} Do not return anything, modify root in-place instead.
     */
    recoverTree(root) {
        let stack = [];
        let node1 = null, node2 = null, prev = null, curr = root;

        while (stack.length > 0 || curr) {
            while (curr) {
                stack.push(curr);
                curr = curr.left;
            }

            curr = stack.pop();
            if (prev && prev.val > curr.val) {
                node2 = curr;
                if (!node1) node1 = prev;
                else break;
            }
            prev = curr;
            curr = curr.right;
        }

        [node1.val, node2.val] = [node2.val, node1.val];
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
    public void RecoverTree(TreeNode root) {
        var stack = new Stack<TreeNode>();
        TreeNode node1 = null, node2 = null, prev = null, curr = root;

        while (stack.Count > 0 || curr != null) {
            while (curr != null) {
                stack.Push(curr);
                curr = curr.left;
            }

            curr = stack.Pop();
            if (prev != null && prev.val > curr.val) {
                node2 = curr;
                if (node1 == null) node1 = prev;
                else break;
            }
            prev = curr;
            curr = curr.right;
        }

        int temp = node1.val;
        node1.val = node2.val;
        node2.val = temp;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

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
    def recoverTree(self, root: Optional[TreeNode]) -> None:
        node1 = node2 = prev = None
        curr = root

        while curr:
            if not curr.left:
                if prev and prev.val > curr.val:
                    node2 = curr
                    if not node1:
                        node1 = prev
                prev = curr
                curr = curr.right
            else:
                pred = curr.left
                while pred.right and pred.right != curr:
                    pred = pred.right

                if not pred.right:
                    pred.right = curr
                    curr = curr.left
                else:
                    pred.right = None
                    if prev and prev.val > curr.val:
                        node2 = curr
                        if not node1:
                            node1 = prev
                    prev = curr
                    curr = curr.right

        node1.val, node2.val = node2.val, node1.val
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
    public void recoverTree(TreeNode root) {
        TreeNode node1 = null, node2 = null, prev = null, curr = root;

        while (curr != null) {
            if (curr.left == null) {
                if (prev != null && prev.val > curr.val) {
                    node2 = curr;
                    if (node1 == null) node1 = prev;
                }
                prev = curr;
                curr = curr.right;
            } else {
                TreeNode pred = curr.left;
                while (pred.right != null && pred.right != curr) {
                    pred = pred.right;
                }

                if (pred.right == null) {
                    pred.right = curr;
                    curr = curr.left;
                } else {
                    pred.right = null;
                    if (prev != null && prev.val > curr.val) {
                        node2 = curr;
                        if (node1 == null) node1 = prev;
                    }
                    prev = curr;
                    curr = curr.right;
                }
            }
        }

        int temp = node1.val;
        node1.val = node2.val;
        node2.val = temp;
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
    void recoverTree(TreeNode* root) {
        TreeNode* node1 = nullptr;
        TreeNode* node2 = nullptr;
        TreeNode* prev = nullptr;
        TreeNode* curr = root;

        while (curr) {
            if (!curr->left) {
                if (prev && prev->val > curr->val) {
                    node2 = curr;
                    if (!node1) node1 = prev;
                }
                prev = curr;
                curr = curr->right;
            } else {
                TreeNode* pred = curr->left;
                while (pred->right && pred->right != curr) {
                    pred = pred->right;
                }

                if (!pred->right) {
                    pred->right = curr;
                    curr = curr->left;
                } else {
                    pred->right = nullptr;
                    if (prev && prev->val > curr->val) {
                        node2 = curr;
                        if (!node1) node1 = prev;
                    }
                    prev = curr;
                    curr = curr->right;
                }
            }
        }

        swap(node1->val, node2->val);
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
     * @return {void} Do not return anything, modify root in-place instead.
     */
    recoverTree(root) {
        let node1 = null, node2 = null, prev = null, curr = root;

        while (curr !== null) {
            if (curr.left === null) {
                if (prev !== null && prev.val > curr.val) {
                    node2 = curr;
                    if (node1 === null) node1 = prev;
                }
                prev = curr;
                curr = curr.right;
            } else {
                let pred = curr.left;
                while (pred.right !== null && pred.right !== curr) {
                    pred = pred.right;
                }

                if (pred.right === null) {
                    pred.right = curr;
                    curr = curr.left;
                } else {
                    pred.right = null;
                    if (prev !== null && prev.val > curr.val) {
                        node2 = curr;
                        if (node1 === null) node1 = prev;
                    }
                    prev = curr;
                    curr = curr.right;
                }
            }
        }

        let temp = node1.val;
        node1.val = node2.val;
        node2.val = temp;
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
    public void RecoverTree(TreeNode root) {
        TreeNode node1 = null, node2 = null, prev = null, curr = root;

        while (curr != null) {
            if (curr.left == null) {
                if (prev != null && prev.val > curr.val) {
                    node2 = curr;
                    if (node1 == null) node1 = prev;
                }
                prev = curr;
                curr = curr.right;
            } else {
                TreeNode pred = curr.left;
                while (pred.right != null && pred.right != curr) {
                    pred = pred.right;
                }

                if (pred.right == null) {
                    pred.right = curr;
                    curr = curr.left;
                } else {
                    pred.right = null;
                    if (prev != null && prev.val > curr.val) {
                        node2 = curr;
                        if (node1 == null) node1 = prev;
                    }
                    prev = curr;
                    curr = curr.right;
                }
            }
        }

        int temp = node1.val;
        node1.val = node2.val;
        node2.val = temp;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$