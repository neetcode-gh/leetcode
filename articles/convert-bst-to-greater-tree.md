## 1. Depth First Search (Two Pass)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def convertBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        def getSum(node):
            if not node:
                return 0
            return node.val + getSum(node.left) + getSum(node.right)

        totalSum = getSum(root)

        def dfs(node):
            nonlocal totalSum
            if not node:
                return

            dfs(node.left)
            tmp = node.val
            node.val = totalSum
            totalSum -= tmp
            dfs(node.right)

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
    private int totalSum;

    public TreeNode convertBST(TreeNode root) {
        totalSum = getSum(root);
        dfs(root);
        return root;
    }

    private int getSum(TreeNode node) {
        if (node == null) return 0;
        return node.val + getSum(node.left) + getSum(node.right);
    }

    private void dfs(TreeNode node) {
        if (node == null) return;

        dfs(node.left);
        int tmp = node.val;
        node.val = totalSum;
        totalSum -= tmp;
        dfs(node.right);
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
    int totalSum;

    TreeNode* convertBST(TreeNode* root) {
        totalSum = getSum(root);
        dfs(root);
        return root;
    }

private:
    int getSum(TreeNode* node) {
        if (!node) return 0;
        return node->val + getSum(node->left) + getSum(node->right);
    }

    void dfs(TreeNode* node) {
        if (!node) return;

        dfs(node->left);
        int tmp = node->val;
        node->val = totalSum;
        totalSum -= tmp;
        dfs(node->right);
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
     * @return {TreeNode}
     */
    convertBST(root) {
        const getSum = (node) => {
            if (!node) return 0;
            return node.val + getSum(node.left) + getSum(node.right);
        };

        let totalSum = getSum(root);

        const dfs = (node) => {
            if (!node) return;

            dfs(node.left);
            let tmp = node.val;
            node.val = totalSum;
            totalSum -= tmp;
            dfs(node.right);
        };

        dfs(root);
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
    public TreeNode ConvertBST(TreeNode root) {
        int GetSum(TreeNode node) {
            if (node == null) return 0;
            return node.val + GetSum(node.left) + GetSum(node.right);
        }

        int totalSum = GetSum(root);

        void Dfs(TreeNode node) {
            if (node == null) return;

            Dfs(node.left);
            int tmp = node.val;
            node.val = totalSum;
            totalSum -= tmp;
            Dfs(node.right);
        }

        Dfs(root);
        return root;
    }
}
```

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func convertBST(root *TreeNode) *TreeNode {
    var getSum func(node *TreeNode) int
    getSum = func(node *TreeNode) int {
        if node == nil {
            return 0
        }
        return node.Val + getSum(node.Left) + getSum(node.Right)
    }

    totalSum := getSum(root)

    var dfs func(node *TreeNode)
    dfs = func(node *TreeNode) {
        if node == nil {
            return
        }
        dfs(node.Left)
        tmp := node.Val
        node.Val = totalSum
        totalSum -= tmp
        dfs(node.Right)
    }

    dfs(root)
    return root
}
```

```kotlin
/**
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int = 0) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun convertBST(root: TreeNode?): TreeNode? {
        fun getSum(node: TreeNode?): Int {
            if (node == null) return 0
            return node.`val` + getSum(node.left) + getSum(node.right)
        }

        var totalSum = getSum(root)

        fun dfs(node: TreeNode?) {
            if (node == null) return
            dfs(node.left)
            val tmp = node.`val`
            node.`val` = totalSum
            totalSum -= tmp
            dfs(node.right)
        }

        dfs(root)
        return root
    }
}
```

```swift
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     public var val: Int
 *     public var left: TreeNode?
 *     public var right: TreeNode?
 *     public init() { self.val = 0; self.left = nil; self.right = nil; }
 *     public init(_ val: Int) { self.val = val; self.left = nil; self.right = nil; }
 *     public init(_ val: Int, _ left: TreeNode?, _ right: TreeNode?) {
 *         self.val = val
 *         self.left = left
 *         self.right = right
 *     }
 * }
 */
class Solution {
    func convertBST(_ root: TreeNode?) -> TreeNode? {
        func getSum(_ node: TreeNode?) -> Int {
            guard let node = node else { return 0 }
            return node.val + getSum(node.left) + getSum(node.right)
        }

        var totalSum = getSum(root)

        func dfs(_ node: TreeNode?) {
            guard let node = node else { return }
            dfs(node.left)
            let tmp = node.val
            node.val = totalSum
            totalSum -= tmp
            dfs(node.right)
        }

        dfs(root)
        return root
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Depth First Search (One Pass)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def convertBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        curSum = 0

        def dfs(node):
            nonlocal curSum
            if not node:
                return

            dfs(node.right)
            tmp = node.val
            node.val += curSum
            curSum += tmp
            dfs(node.left)

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
    private int curSum = 0;

    public TreeNode convertBST(TreeNode root) {
        dfs(root);
        return root;
    }

    private void dfs(TreeNode node) {
        if (node == null) return;

        dfs(node.right);
        int tmp = node.val;
        node.val += curSum;
        curSum += tmp;
        dfs(node.left);
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
    int curSum = 0;

    TreeNode* convertBST(TreeNode* root) {
        dfs(root);
        return root;
    }

private:
    void dfs(TreeNode* node) {
        if (!node) return;

        dfs(node->right);
        int tmp = node->val;
        node->val += curSum;
        curSum += tmp;
        dfs(node->left);
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
     * @return {TreeNode}
     */
    convertBST(root) {
        let curSum = 0;

        const dfs = (node) => {
            if (!node) return;

            dfs(node.right);
            let tmp = node.val;
            node.val += curSum;
            curSum += tmp;
            dfs(node.left);
        };

        dfs(root);
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
    public TreeNode ConvertBST(TreeNode root) {
        int curSum = 0;

        void Dfs(TreeNode node) {
            if (node == null) return;

            Dfs(node.right);
            int tmp = node.val;
            node.val += curSum;
            curSum += tmp;
            Dfs(node.left);
        }

        Dfs(root);
        return root;
    }
}
```

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func convertBST(root *TreeNode) *TreeNode {
    curSum := 0

    var dfs func(node *TreeNode)
    dfs = func(node *TreeNode) {
        if node == nil {
            return
        }
        dfs(node.Right)
        tmp := node.Val
        node.Val += curSum
        curSum += tmp
        dfs(node.Left)
    }

    dfs(root)
    return root
}
```

```kotlin
/**
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int = 0) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun convertBST(root: TreeNode?): TreeNode? {
        var curSum = 0

        fun dfs(node: TreeNode?) {
            if (node == null) return
            dfs(node.right)
            val tmp = node.`val`
            node.`val` += curSum
            curSum += tmp
            dfs(node.left)
        }

        dfs(root)
        return root
    }
}
```

```swift
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     public var val: Int
 *     public var left: TreeNode?
 *     public var right: TreeNode?
 *     public init() { self.val = 0; self.left = nil; self.right = nil; }
 *     public init(_ val: Int) { self.val = val; self.left = nil; self.right = nil; }
 *     public init(_ val: Int, _ left: TreeNode?, _ right: TreeNode?) {
 *         self.val = val
 *         self.left = left
 *         self.right = right
 *     }
 * }
 */
class Solution {
    func convertBST(_ root: TreeNode?) -> TreeNode? {
        var curSum = 0

        func dfs(_ node: TreeNode?) {
            guard let node = node else { return }
            dfs(node.right)
            let tmp = node.val
            node.val += curSum
            curSum += tmp
            dfs(node.left)
        }

        dfs(root)
        return root
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

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
    def convertBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        curSum = 0
        stack = []
        node = root

        while stack or node:
            while node:
                stack.append(node)
                node = node.right

            node = stack.pop()
            curSum += node.val
            node.val = curSum
            node = node.left

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
    public TreeNode convertBST(TreeNode root) {
        int curSum = 0;
        Stack<TreeNode> stack = new Stack<>();
        TreeNode node = root;

        while (!stack.isEmpty() || node != null) {
            while (node != null) {
                stack.push(node);
                node = node.right;
            }

            node = stack.pop();
            curSum += node.val;
            node.val = curSum;
            node = node.left;
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
    TreeNode* convertBST(TreeNode* root) {
        int curSum = 0;
        stack<TreeNode*> st;
        TreeNode* node = root;

        while (!st.empty() || node) {
            while (node) {
                st.push(node);
                node = node->right;
            }

            node = st.top(); st.pop();
            curSum += node->val;
            node->val = curSum;
            node = node->left;
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
     * @param {TreeNode} root
     * @return {TreeNode}
     */
    convertBST(root) {
        let curSum = 0;
        const stack = [];
        let node = root;

        while (stack.length || node) {
            while (node) {
                stack.push(node);
                node = node.right;
            }

            node = stack.pop();
            curSum += node.val;
            node.val = curSum;
            node = node.left;
        }
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
    public TreeNode ConvertBST(TreeNode root) {
        int curSum = 0;
        Stack<TreeNode> stack = new Stack<TreeNode>();
        TreeNode node = root;

        while (stack.Count > 0 || node != null) {
            while (node != null) {
                stack.Push(node);
                node = node.right;
            }

            node = stack.Pop();
            curSum += node.val;
            node.val = curSum;
            node = node.left;
        }

        return root;
    }
}
```

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func convertBST(root *TreeNode) *TreeNode {
    curSum := 0
    stack := []*TreeNode{}
    node := root

    for len(stack) > 0 || node != nil {
        for node != nil {
            stack = append(stack, node)
            node = node.Right
        }

        node = stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        curSum += node.Val
        node.Val = curSum
        node = node.Left
    }

    return root
}
```

```kotlin
/**
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int = 0) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun convertBST(root: TreeNode?): TreeNode? {
        var curSum = 0
        val stack = ArrayDeque<TreeNode>()
        var node = root

        while (stack.isNotEmpty() || node != null) {
            while (node != null) {
                stack.addLast(node)
                node = node.right
            }

            node = stack.removeLast()
            curSum += node.`val`
            node.`val` = curSum
            node = node.left
        }

        return root
    }
}
```

```swift
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     public var val: Int
 *     public var left: TreeNode?
 *     public var right: TreeNode?
 *     public init() { self.val = 0; self.left = nil; self.right = nil; }
 *     public init(_ val: Int) { self.val = val; self.left = nil; self.right = nil; }
 *     public init(_ val: Int, _ left: TreeNode?, _ right: TreeNode?) {
 *         self.val = val
 *         self.left = left
 *         self.right = right
 *     }
 * }
 */
class Solution {
    func convertBST(_ root: TreeNode?) -> TreeNode? {
        var curSum = 0
        var stack = [TreeNode]()
        var node = root

        while !stack.isEmpty || node != nil {
            while node != nil {
                stack.append(node!)
                node = node?.right
            }

            node = stack.removeLast()
            curSum += node!.val
            node!.val = curSum
            node = node?.left
        }

        return root
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

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
    def convertBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        curSum = 0
        cur = root

        while cur:
            if cur.right:
                prev = cur.right
                while prev.left and prev.left != cur:
                    prev = prev.left

                if not prev.left:
                    prev.left = cur
                    cur = cur.right
                else:
                    prev.left = None
                    curSum += cur.val
                    cur.val = curSum
                    cur = cur.left
            else:
                curSum += cur.val
                cur.val = curSum
                cur = cur.left

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
    public TreeNode convertBST(TreeNode root) {
        int curSum = 0;
        TreeNode cur = root;

        while (cur != null) {
            if (cur.right != null) {
                TreeNode prev = cur.right;
                while (prev.left != null && prev.left != cur) {
                    prev = prev.left;
                }

                if (prev.left == null) {
                    prev.left = cur;
                    cur = cur.right;
                } else {
                    prev.left = null;
                    curSum += cur.val;
                    cur.val = curSum;
                    cur = cur.left;
                }
            } else {
                curSum += cur.val;
                cur.val = curSum;
                cur = cur.left;
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
    TreeNode* convertBST(TreeNode* root) {
        int curSum = 0;
        TreeNode* cur = root;

        while (cur) {
            if (cur->right) {
                TreeNode* prev = cur->right;
                while (prev->left && prev->left != cur) {
                    prev = prev->left;
                }

                if (!prev->left) {
                    prev->left = cur;
                    cur = cur->right;
                } else {
                    prev->left = nullptr;
                    curSum += cur->val;
                    cur->val = curSum;
                    cur = cur->left;
                }
            } else {
                curSum += cur->val;
                cur->val = curSum;
                cur = cur->left;
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
     * @param {TreeNode} root
     * @return {TreeNode}
     */
    convertBST(root) {
        let curSum = 0;
        let cur = root;

        while (cur) {
            if (cur.right) {
                let prev = cur.right;
                while (prev.left && prev.left !== cur) {
                    prev = prev.left;
                }

                if (!prev.left) {
                    prev.left = cur;
                    cur = cur.right;
                } else {
                    prev.left = null;
                    curSum += cur.val;
                    cur.val = curSum;
                    cur = cur.left;
                }
            } else {
                curSum += cur.val;
                cur.val = curSum;
                cur = cur.left;
            }
        }
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
    public TreeNode ConvertBST(TreeNode root) {
        int curSum = 0;
        TreeNode cur = root;

        while (cur != null) {
            if (cur.right != null) {
                TreeNode prev = cur.right;
                while (prev.left != null && prev.left != cur) {
                    prev = prev.left;
                }

                if (prev.left == null) {
                    prev.left = cur;
                    cur = cur.right;
                } else {
                    prev.left = null;
                    curSum += cur.val;
                    cur.val = curSum;
                    cur = cur.left;
                }
            } else {
                curSum += cur.val;
                cur.val = curSum;
                cur = cur.left;
            }
        }

        return root;
    }
}
```

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func convertBST(root *TreeNode) *TreeNode {
    curSum := 0
    cur := root

    for cur != nil {
        if cur.Right != nil {
            prev := cur.Right
            for prev.Left != nil && prev.Left != cur {
                prev = prev.Left
            }

            if prev.Left == nil {
                prev.Left = cur
                cur = cur.Right
            } else {
                prev.Left = nil
                curSum += cur.Val
                cur.Val = curSum
                cur = cur.Left
            }
        } else {
            curSum += cur.Val
            cur.Val = curSum
            cur = cur.Left
        }
    }

    return root
}
```

```kotlin
/**
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int = 0) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun convertBST(root: TreeNode?): TreeNode? {
        var curSum = 0
        var cur = root

        while (cur != null) {
            if (cur.right != null) {
                var prev = cur.right
                while (prev!!.left != null && prev.left != cur) {
                    prev = prev.left
                }

                if (prev.left == null) {
                    prev.left = cur
                    cur = cur.right
                } else {
                    prev.left = null
                    curSum += cur.`val`
                    cur.`val` = curSum
                    cur = cur.left
                }
            } else {
                curSum += cur.`val`
                cur.`val` = curSum
                cur = cur.left
            }
        }

        return root
    }
}
```

```swift
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     public var val: Int
 *     public var left: TreeNode?
 *     public var right: TreeNode?
 *     public init() { self.val = 0; self.left = nil; self.right = nil; }
 *     public init(_ val: Int) { self.val = val; self.left = nil; self.right = nil; }
 *     public init(_ val: Int, _ left: TreeNode?, _ right: TreeNode?) {
 *         self.val = val
 *         self.left = left
 *         self.right = right
 *     }
 * }
 */
class Solution {
    func convertBST(_ root: TreeNode?) -> TreeNode? {
        var curSum = 0
        var cur = root

        while cur != nil {
            if cur!.right != nil {
                var prev = cur!.right
                while prev!.left != nil && prev!.left !== cur {
                    prev = prev!.left
                }

                if prev!.left == nil {
                    prev!.left = cur
                    cur = cur!.right
                } else {
                    prev!.left = nil
                    curSum += cur!.val
                    cur!.val = curSum
                    cur = cur!.left
                }
            } else {
                curSum += cur!.val
                cur!.val = curSum
                cur = cur!.left
            }
        }

        return root
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
