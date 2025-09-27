## 1. Flattening the BST (DFS)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class BSTIterator:

    def __init__(self, root: Optional[TreeNode]):
        self.arr = []
        self.itr = 0

        def dfs(node):
            if not node:
                return
            dfs(node.left)
            self.arr.append(node.val)
            dfs(node.right)

        dfs(root)

    def next(self) -> int:
        val = self.arr[self.itr]
        self.itr += 1
        return val

    def hasNext(self) -> bool:
        return self.itr < len(self.arr)
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
public class BSTIterator {
    private List<Integer> arr;
    private int itr;

    public BSTIterator(TreeNode root) {
        arr = new ArrayList<>();
        itr = 0;
        dfs(root);
    }

    private void dfs(TreeNode node) {
        if (node == null) {
            return;
        }
        dfs(node.left);
        arr.add(node.val);
        dfs(node.right);
    }

    public int next() {
        return arr.get(itr++);
    }

    public boolean hasNext() {
        return itr < arr.size();
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
class BSTIterator {
private:
    vector<int> arr;
    int itr;

    void dfs(TreeNode* node) {
        if (!node) {
            return;
        }
        dfs(node->left);
        arr.push_back(node->val);
        dfs(node->right);
    }

public:
    BSTIterator(TreeNode* root) {
        itr = 0;
        dfs(root);
    }

    int next() {
        return arr[itr++];
    }

    bool hasNext() {
        return itr < arr.size();
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
class BSTIterator {
    /**
     * @constructor
     * @param {TreeNode} root
     */
    constructor(root) {
        this.arr = [];
        this.itr = 0;

        const dfs = (node) => {
            if (!node) {
                return;
            }
            dfs(node.left);
            this.arr.push(node.val);
            dfs(node.right);
        };

        dfs(root);
    }

    /**
     * @return {number}
     */
    next() {
        return this.arr[this.itr++];
    }

    /**
     * @return {boolean}
     */
    hasNext() {
        return this.itr < this.arr.length;
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
public class BSTIterator {
    private List<int> arr;
    private int itr;

    public BSTIterator(TreeNode root) {
        arr = new List<int>();
        itr = 0;
        Dfs(root);
    }

    private void Dfs(TreeNode node) {
        if (node == null) return;
        Dfs(node.left);
        arr.Add(node.val);
        Dfs(node.right);
    }

    public int Next() {
        int val = arr[itr];
        itr++;
        return val;
    }

    public bool HasNext() {
        return itr < arr.Count;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n)$ time for initialization.
    - $O(n)$ time for each $next()$ and $hasNext()$ function calls.
- Space complexity: $O(n)$

---

## 2. Flatten the BST (Iterative DFS)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class BSTIterator:

    def __init__(self, root: Optional[TreeNode]):
        self.arr = []
        self.itr = 0

        stack = []
        while root or stack:
            while root:
                stack.append(root)
                root = root.left
            root = stack.pop()
            self.arr.append(root.val)
            root = root.right

    def next(self) -> int:
        val = self.arr[self.itr]
        self.itr += 1
        return val

    def hasNext(self) -> bool:
        return self.itr < len(self.arr)
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
public class BSTIterator {
    private List<Integer> arr;
    private int itr;

    public BSTIterator(TreeNode root) {
        arr = new ArrayList<>();
        itr = 0;
        Stack<TreeNode> stack = new Stack<>();
        while (root != null || !stack.isEmpty()) {
            while (root != null) {
                stack.push(root);
                root = root.left;
            }
            root = stack.pop();
            arr.add(root.val);
            root = root.right;
        }
    }

    public int next() {
        return arr.get(itr++);
    }

    public boolean hasNext() {
        return itr < arr.size();
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
class BSTIterator {
private:
    vector<int> arr;
    int itr;

public:
    BSTIterator(TreeNode* root) {
        itr = 0;
        stack<TreeNode*> stack;
        while (root || !stack.empty()) {
            while (root) {
                stack.push(root);
                root = root->left;
            }
            root = stack.top();
            stack.pop();
            arr.push_back(root->val);
            root = root->right;
        }
    }

    int next() {
        return arr[itr++];
    }

    bool hasNext() {
        return itr < arr.size();
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
class BSTIterator {
    /**
     * @constructor
     * @param {TreeNode} root
     */
    constructor(root) {
        this.arr = [];
        this.itr = 0;

        let stack = [];
        while (root || stack.length) {
            while (root) {
                stack.push(root);
                root = root.left;
            }
            root = stack.pop();
            this.arr.push(root.val);
            root = root.right;
        }
    }

    /**
     * @return {number}
     */
    next() {
        return this.arr[this.itr++];
    }

    /**
     * @return {boolean}
     */
    hasNext() {
        return this.itr < this.arr.length;
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
public class BSTIterator {
    private List<int> arr;
    private int itr;

    public BSTIterator(TreeNode root) {
        arr = new List<int>();
        itr = 0;

        Stack<TreeNode> stack = new Stack<TreeNode>();
        while (root != null || stack.Count > 0) {
            while (root != null) {
                stack.Push(root);
                root = root.left;
            }
            root = stack.Pop();
            arr.Add(root.val);
            root = root.right;
        }
    }

    public int Next() {
        int val = arr[itr];
        itr++;
        return val;
    }

    public bool HasNext() {
        return itr < arr.Count;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n)$ time for initialization.
    - $O(n)$ time for each $next()$ and $hasNext()$ function calls.
- Space complexity: $O(n)$

---

## 3. Iterative DFS - I

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class BSTIterator:

    def __init__(self, root: Optional[TreeNode]):
        self.stack = []
        while root:
            self.stack.append(root)
            root = root.left

    def next(self) -> int:
        res = self.stack.pop()
        cur = res.right
        while cur:
            self.stack.append(cur)
            cur = cur.left
        return res.val

    def hasNext(self) -> bool:
        return bool(self.stack)
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
public class BSTIterator {
    private Stack<TreeNode> stack;

    public BSTIterator(TreeNode root) {
        stack = new Stack<>();
        while (root != null) {
            stack.push(root);
            root = root.left;
        }
    }

    public int next() {
        TreeNode res = stack.pop();
        TreeNode cur = res.right;
        while (cur != null) {
            stack.push(cur);
            cur = cur.left;
        }
        return res.val;
    }

    public boolean hasNext() {
        return !stack.isEmpty();
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
class BSTIterator {
private:
    stack<TreeNode*> stack;

public:
    BSTIterator(TreeNode* root) {
        while (root) {
            stack.push(root);
            root = root->left;
        }
    }

    int next() {
        TreeNode* res = stack.top();
        stack.pop();
        TreeNode* cur = res->right;
        while (cur) {
            stack.push(cur);
            cur = cur->left;
        }
        return res->val;
    }

    bool hasNext() {
        return !stack.empty();
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
class BSTIterator {
    /**
     * @constructor
     * @param {TreeNode} root
     */
    constructor(root) {
        this.stack = [];
        while (root) {
            this.stack.push(root);
            root = root.left;
        }
    }

    /**
     * @return {number}
     */
    next() {
        let res = this.stack.pop();
        let cur = res.right;
        while (cur) {
            this.stack.push(cur);
            cur = cur.left;
        }
        return res.val;
    }

    /**
     * @return {boolean}
     */
    hasNext() {
        return this.stack.length > 0;
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
public class BSTIterator {
    private Stack<TreeNode> stack;

    public BSTIterator(TreeNode root) {
        stack = new Stack<TreeNode>();
        while (root != null) {
            stack.Push(root);
            root = root.left;
        }
    }

    public int Next() {
        TreeNode node = stack.Pop();
        TreeNode cur = node.right;
        while (cur != null) {
            stack.Push(cur);
            cur = cur.left;
        }
        return node.val;
    }

    public bool HasNext() {
        return stack.Count > 0;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$ in average for each function call.
- Space complexity: $O(h)$

> Where $n$ is the number of nodes and $h$ is the height of the given tree.

---

## 4. Iterative DFS - II

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class BSTIterator:

    def __init__(self, root: Optional[TreeNode]):
        self.cur = root
        self.stack = []

    def next(self) -> int:
        while self.cur:
            self.stack.append(self.cur)
            self.cur = self.cur.left

        node = self.stack.pop()
        self.cur = node.right
        return node.val

    def hasNext(self) -> bool:
        return bool(self.cur) or bool(self.stack)
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
public class BSTIterator {
    private TreeNode cur;
    private Stack<TreeNode> stack;

    public BSTIterator(TreeNode root) {
        cur = root;
        stack = new Stack<>();
    }

    public int next() {
        while (cur != null) {
            stack.push(cur);
            cur = cur.left;
        }

        TreeNode node = stack.pop();
        cur = node.right;
        return node.val;
    }

    public boolean hasNext() {
        return cur != null || !stack.isEmpty();
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
class BSTIterator {
private:
    TreeNode* cur;
    stack<TreeNode*> stack;

public:
    BSTIterator(TreeNode* root) {
        cur = root;
    }

    int next() {
        while (cur) {
            stack.push(cur);
            cur = cur->left;
        }

        TreeNode* node = stack.top();
        stack.pop();
        cur = node->right;
        return node->val;
    }

    bool hasNext() {
        return cur || !stack.empty();
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
class BSTIterator {
    /**
     * @constructor
     * @param {TreeNode} root
     */
    constructor(root) {
        this.cur = root;
        this.stack = [];
    }

    /**
     * @return {number}
     */
    next() {
        while (this.cur) {
            this.stack.push(this.cur);
            this.cur = this.cur.left;
        }

        let node = this.stack.pop();
        this.cur = node.right;
        return node.val;
    }

    /**
     * @return {boolean}
     */
    hasNext() {
        return this.cur !== null || this.stack.length > 0;
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
public class BSTIterator {
    private TreeNode cur;
    private Stack<TreeNode> stack;

    public BSTIterator(TreeNode root) {
        cur = root;
        stack = new Stack<TreeNode>();
    }

    public int Next() {
        while (cur != null) {
            stack.Push(cur);
            cur = cur.left;
        }
        TreeNode node = stack.Pop();
        cur = node.right;
        return node.val;
    }

    public bool HasNext() {
        return cur != null || stack.Count > 0;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$ in average for each function call.
- Space complexity: $O(h)$

> Where $n$ is the number of nodes and $h$ is the height of the given tree.
