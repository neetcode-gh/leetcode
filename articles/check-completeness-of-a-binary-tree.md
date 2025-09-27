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
    def isCompleteTree(self, root: Optional[TreeNode]) -> bool:
        q = deque([root])
        while q:
            node = q.popleft()
            if node:
                q.append(node.left)
                q.append(node.right)
            else:
                while q:
                    if q.popleft():
                        return False
        return True
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
    public boolean isCompleteTree(TreeNode root) {
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);

        while (!q.isEmpty()) {
            TreeNode node = q.poll();
            if (node != null) {
                q.add(node.left);
                q.add(node.right);
            } else {
                while (!q.isEmpty()) {
                    if (q.poll() != null) {
                        return false;
                    }
                }
            }
        }
        return true;
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
    bool isCompleteTree(TreeNode* root) {
        queue<TreeNode*> q;
        q.push(root);

        while (!q.empty()) {
            TreeNode* node = q.front();
            q.pop();
            if (node) {
                q.push(node->left);
                q.push(node->right);
            } else {
                while (!q.empty()) {
                    if (q.front()) {
                        return false;
                    }
                    q.pop();
                }
            }
        }
        return true;
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
     * @return {boolean}
     */
    isCompleteTree(root) {
        const queue = new Queue([root]);

        while (!queue.isEmpty()) {
            const node = queue.pop();
            if (node) {
                queue.push(node.left);
                queue.push(node.right);
            } else {
                while (!queue.isEmpty()) {
                    if (queue.pop()) {
                        return false;
                    }
                }
            }
        }
        return true;
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
    public bool IsCompleteTree(TreeNode root) {
        Queue<TreeNode> q = new Queue<TreeNode>();
        q.Enqueue(root);

        while (q.Count > 0) {
            TreeNode node = q.Dequeue();
            if (node != null) {
                q.Enqueue(node.left);
                q.Enqueue(node.right);
            } else {
                while (q.Count > 0) {
                    if (q.Dequeue() != null) {
                        return false;
                    }
                }
            }
        }

        return true;
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
    def isCompleteTree(self, root: Optional[TreeNode]) -> bool:
        q = deque([root])
        nullSeen = False
        while q:
            node = q.popleft()
            if node:
                if nullSeen:
                    return False
                q.append(node.left)
                q.append(node.right)
            else:
                nullSeen = True
        return True
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
    public boolean isCompleteTree(TreeNode root) {
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        boolean nullSeen = false;

        while (!q.isEmpty()) {
            TreeNode node = q.poll();
            if (node != null) {
                if (nullSeen) return false;
                q.add(node.left);
                q.add(node.right);
            } else {
                nullSeen = true;
            }
        }
        return true;
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
    bool isCompleteTree(TreeNode* root) {
        queue<TreeNode*> q;
        q.push(root);
        bool nullSeen = false;

        while (!q.empty()) {
            TreeNode* node = q.front();
            q.pop();
            if (node) {
                if (nullSeen) return false;
                q.push(node->left);
                q.push(node->right);
            } else {
                nullSeen = true;
            }
        }
        return true;
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
     * @return {boolean}
     */
    isCompleteTree(root) {
        const queue = new Queue([root]);
        let nullSeen = false;

        while (!queue.isEmpty()) {
            const node = queue.pop();
            if (node) {
                if (nullSeen) return false;
                queue.push(node.left);
                queue.push(node.right);
            } else {
                nullSeen = true;
            }
        }
        return true;
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
    public bool IsCompleteTree(TreeNode root) {
        Queue<TreeNode> q = new Queue<TreeNode>();
        q.Enqueue(root);
        bool nullSeen = false;

        while (q.Count > 0) {
            TreeNode node = q.Dequeue();
            if (node != null) {
                if (nullSeen) {
                    return false;
                }
                q.Enqueue(node.left);
                q.Enqueue(node.right);
            } else {
                nullSeen = true;
            }
        }

        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Depth First Search (Two Pass)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isCompleteTree(self, root: Optional[TreeNode]) -> bool:
        def dfs(node, index, n):
            if not node:
                return True
            if index >= n:
                return False

            left = dfs(node.left, 2 * index + 1, n)
            right = dfs(node.right, 2 * index + 2, n)
            return left and right

        def countNodes(node):
            if not node:
                return 0
            return 1 + countNodes(node.left) + countNodes(node.right)

        n = countNodes(root)
        return dfs(root, 0, n)
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
    private int countNodes(TreeNode root) {
        if (root == null) return 0;
        return 1 + countNodes(root.left) + countNodes(root.right);
    }

    private boolean dfs(TreeNode node, int index, int n) {
        if (node == null) return true;
        if (index >= n) return false;
        return dfs(node.left, 2 * index + 1, n) && dfs(node.right, 2 * index + 2, n);
    }

    public boolean isCompleteTree(TreeNode root) {
        int n = countNodes(root);
        return dfs(root, 0, n);
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
    int countNodes(TreeNode* root) {
        if (!root) return 0;
        return 1 + countNodes(root->left) + countNodes(root->right);
    }

    bool dfs(TreeNode* node, int index, int n) {
        if (!node) return true;
        if (index >= n) return false;
        return dfs(node->left, 2 * index + 1, n) && dfs(node->right, 2 * index + 2, n);
    }

    bool isCompleteTree(TreeNode* root) {
        int n = countNodes(root);
        return dfs(root, 0, n);
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
     * @return {boolean}
     */
    isCompleteTree(root) {
        const countNodes = (node) => {
            if (!node) return 0;
            return 1 + countNodes(node.left) + countNodes(node.right);
        };

        const dfs = (node, index, n) => {
            if (!node) return true;
            if (index >= n) return false;
            return (
                dfs(node.left, 2 * index + 1, n) &&
                dfs(node.right, 2 * index + 2, n)
            );
        };

        const n = countNodes(root);
        return dfs(root, 0, n);
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
    public bool IsCompleteTree(TreeNode root) {
        int n = CountNodes(root);
        return Dfs(root, 0, n);
    }

    private bool Dfs(TreeNode node, int index, int n) {
        if (node == null) return true;
        if (index >= n) return false;
        return Dfs(node.left, 2 * index + 1, n) && Dfs(node.right, 2 * index + 2, n);
    }

    private int CountNodes(TreeNode node) {
        if (node == null) return 0;
        return 1 + CountNodes(node.left) + CountNodes(node.right);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 4. Depth First Search (Optimal)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isCompleteTree(self, root: Optional[TreeNode]) -> bool:
        treeHgt = 0
        nullSeen = False

        def dfs(node, hgt):
            nonlocal treeHgt, nullSeen
            if not node:
                if treeHgt == 0:
                    treeHgt = hgt
                elif hgt == treeHgt - 1:
                    nullSeen = True
                elif hgt != treeHgt:
                    return False
                return not (hgt == treeHgt and nullSeen)

            return dfs(node.left, hgt + 1) and dfs(node.right, hgt + 1)

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
    private int treeHgt = 0;
    private boolean nullSeen = false;

    private boolean dfs(TreeNode node, int hgt) {
        if (node == null) {
            if (treeHgt == 0) {
                treeHgt = hgt;
            } else if (hgt == treeHgt - 1) {
                nullSeen = true;
            } else if (hgt != treeHgt) {
                return false;
            }
            return !(hgt == treeHgt && nullSeen);
        }

        return dfs(node.left, hgt + 1) && dfs(node.right, hgt + 1);
    }

    public boolean isCompleteTree(TreeNode root) {
        return dfs(root, 0);
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
    int treeHgt = 0;
    bool nullSeen = false;

    bool dfs(TreeNode* node, int hgt) {
        if (!node) {
            if (treeHgt == 0) {
                treeHgt = hgt;
            } else if (hgt == treeHgt - 1) {
                nullSeen = true;
            } else if (hgt != treeHgt) {
                return false;
            }
            return !(hgt == treeHgt && nullSeen);
        }

        return dfs(node->left, hgt + 1) && dfs(node->right, hgt + 1);
    }

    bool isCompleteTree(TreeNode* root) {
        return dfs(root, 0);
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
     * @return {boolean}
     */
    isCompleteTree(root) {
        let treeHgt = 0;
        let nullSeen = false;

        const dfs = (node, hgt) => {
            if (!node) {
                if (treeHgt === 0) {
                    treeHgt = hgt;
                } else if (hgt === treeHgt - 1) {
                    nullSeen = true;
                } else if (hgt !== treeHgt) {
                    return false;
                }
                return !(hgt === treeHgt && nullSeen);
            }

            return dfs(node.left, hgt + 1) && dfs(node.right, hgt + 1);
        };

        return dfs(root, 0);
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
    private int treeHgt = 0;
    private bool nullSeen = false;

    public bool IsCompleteTree(TreeNode root) {
        return Dfs(root, 0);
    }

    private bool Dfs(TreeNode node, int hgt) {
        if (node == null) {
            if (treeHgt == 0) {
                treeHgt = hgt;
            } else if (hgt == treeHgt - 1) {
                nullSeen = true;
            } else if (hgt != treeHgt) {
                return false;
            }
            return !(hgt == treeHgt && nullSeen);
        }
        return Dfs(node.left, hgt + 1) && Dfs(node.right, hgt + 1);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.
