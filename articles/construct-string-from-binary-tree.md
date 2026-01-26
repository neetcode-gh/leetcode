## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Binary Tree Traversals** - Understanding preorder traversal (root-left-right) for string construction
- **Recursion / DFS** - Traversing trees recursively to build the string representation
- **String Building** - Efficiently concatenating strings using StringBuilder or list accumulation
- **Stack-based Iteration** - Converting recursive DFS to iterative using an explicit stack

---

## 1. Depth First Search

### Intuition
We need to create a string representation using preorder traversal with parentheses. The key observation is handling empty subtrees: we must include empty parentheses `()` for a missing left child only when a right child exists (to preserve the tree structure), but we can omit parentheses for a missing right child entirely.

### Algorithm
1. If the node is `null`, return an empty string.
2. Recursively get string representations of left and right subtrees.
3. If both children exist, return `"val(left)(right)"`.
4. If only the right child exists, return `"val()(right)"` (empty parentheses for missing left).
5. If only the left child exists, return `"val(left)"` (no parentheses needed for missing right).
6. If the node is a leaf, return just its value as a string.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def tree2str(self, root: Optional[TreeNode]) -> str:
        if not root:
            return ""

        cur = root.val
        left = self.tree2str(root.left)
        right = self.tree2str(root.right)

        if left and right:
            return f"{cur}({left})({right})"

        if right:
            return f"{cur}()({right})"

        if left:
            return f"{cur}({left})"

        return str(cur)
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
    public String tree2str(TreeNode root) {
        if (root == null) {
            return "";
        }

        String cur = Integer.toString(root.val);
        String left = tree2str(root.left);
        String right = tree2str(root.right);

        if (!left.isEmpty() && !right.isEmpty()) {
            return cur + "(" + left + ")" + "(" + right + ")";
        }

        if (!right.isEmpty()) {
            return cur + "()" + "(" + right + ")";
        }

        if (!left.isEmpty()) {
            return cur + "(" + left + ")";
        }

        return cur;
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
    string tree2str(TreeNode* root) {
        if (!root) {
            return "";
        }

        string cur = to_string(root->val);
        string left = tree2str(root->left);
        string right = tree2str(root->right);

        if (!left.empty() && !right.empty()) {
            return cur + "(" + left + ")(" + right + ")";
        }

        if (!right.empty()) {
            return cur + "()(" + right + ")";
        }

        if (!left.empty()) {
            return cur + "(" + left + ")";
        }

        return cur;
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
     * @return {string}
     */
    tree2str(root) {
        if (!root) {
            return '';
        }

        const cur = root.val.toString();
        const left = this.tree2str(root.left);
        const right = this.tree2str(root.right);

        if (left && right) {
            return `${cur}(${left})(${right})`;
        }

        if (right) {
            return `${cur}()(${right})`;
        }

        if (left) {
            return `${cur}(${left})`;
        }

        return cur;
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
    public string Tree2str(TreeNode root) {
        if (root == null) {
            return "";
        }

        string cur = root.val.ToString();
        string left = Tree2str(root.left);
        string right = Tree2str(root.right);

        if (!string.IsNullOrEmpty(left) && !string.IsNullOrEmpty(right)) {
            return cur + "(" + left + ")" + "(" + right + ")";
        }

        if (!string.IsNullOrEmpty(right)) {
            return cur + "()" + "(" + right + ")";
        }

        if (!string.IsNullOrEmpty(left)) {
            return cur + "(" + left + ")";
        }

        return cur;
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
func tree2str(root *TreeNode) string {
    if root == nil {
        return ""
    }

    cur := strconv.Itoa(root.Val)
    left := tree2str(root.Left)
    right := tree2str(root.Right)

    if left != "" && right != "" {
        return cur + "(" + left + ")(" + right + ")"
    }

    if right != "" {
        return cur + "()(" + right + ")"
    }

    if left != "" {
        return cur + "(" + left + ")"
    }

    return cur
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
    fun tree2str(root: TreeNode?): String {
        if (root == null) {
            return ""
        }

        val cur = root.`val`.toString()
        val left = tree2str(root.left)
        val right = tree2str(root.right)

        if (left.isNotEmpty() && right.isNotEmpty()) {
            return "$cur($left)($right)"
        }

        if (right.isNotEmpty()) {
            return "$cur()($right)"
        }

        if (left.isNotEmpty()) {
            return "$cur($left)"
        }

        return cur
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
    func tree2str(_ root: TreeNode?) -> String {
        guard let root = root else {
            return ""
        }

        let cur = String(root.val)
        let left = tree2str(root.left)
        let right = tree2str(root.right)

        if !left.isEmpty && !right.isEmpty {
            return "\(cur)(\(left))(\(right))"
        }

        if !right.isEmpty {
            return "\(cur)()(\(right))"
        }

        if !left.isEmpty {
            return "\(cur)(\(left))"
        }

        return cur
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Depth First Search (Optimal)

### Intuition
The previous approach creates many intermediate strings during concatenation, which is inefficient. Instead, we can use a StringBuilder (or list) to accumulate characters. We always add an opening parenthesis before processing a node and a closing parenthesis after, then trim the outermost parentheses at the end.

### Algorithm
1. Create a result list or StringBuilder.
2. Define a preorder function that:
   - Returns immediately if the node is `null`.
   - Appends `"("` followed by the node's value.
   - If `left` is `null` but `right` exists, appends `"()"`.
   - Recursively processes `left`, then `right`.
   - Appends `")"`.
3. Call preorder on the root.
4. Join the result and remove the first and last characters (the extra outer parentheses).

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def tree2str(self, root: Optional[TreeNode]) -> str:
        res = []

        def preorder(root):
            if not root:
                return
            res.append("(")
            res.append(str(root.val))
            if not root.left and root.right:
                res.append("()")
            preorder(root.left)
            preorder(root.right)
            res.append(")")

        preorder(root)
        return "".join(res)[1:-1]
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
    public String tree2str(TreeNode root) {
        StringBuilder res = new StringBuilder();

        preorder(root, res);
        return res.substring(1, res.length() - 1);
    }

    private void preorder(TreeNode root, StringBuilder res) {
        if (root == null) return;

        res.append("(").append(root.val);
        if (root.left == null && root.right != null) {
            res.append("()");
        }
        preorder(root.left, res);
        preorder(root.right, res);
        res.append(")");
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
    string tree2str(TreeNode* root) {
        string res;
        preorder(root, res);
        return res.substr(1, res.size() - 2);
    }

private:
    void preorder(TreeNode* root, string& res) {
        if (!root) return;

        res += "(" + to_string(root->val);
        if (!root->left && root->right) {
            res += "()";
        }
        preorder(root->left, res);
        preorder(root->right, res);
        res += ")";
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
     * @return {string}
     */
    tree2str(root) {
        let res = [];

        const preorder = (root) => {
            if (!root) return;

            res.push('(');
            res.push(root.val.toString());
            if (!root.left && root.right) {
                res.push('()');
            }
            preorder(root.left);
            preorder(root.right);
            res.push(')');
        };

        preorder(root);
        return res.join('').slice(1, -1);
    }
}
```

```csharp
public class Solution {
    public string Tree2str(TreeNode root) {
        var res = new StringBuilder();
        Preorder(root, res);
        return res.ToString().Substring(1, res.Length - 2);
    }

    private void Preorder(TreeNode root, StringBuilder res) {
        if (root == null) return;

        res.Append("(").Append(root.val);
        if (root.left == null && root.right != null) {
            res.Append("()");
        }
        Preorder(root.left, res);
        Preorder(root.right, res);
        res.Append(")");
    }
}
```

```go
func tree2str(root *TreeNode) string {
    var res strings.Builder

    var preorder func(node *TreeNode)
    preorder = func(node *TreeNode) {
        if node == nil {
            return
        }
        res.WriteString("(")
        res.WriteString(strconv.Itoa(node.Val))
        if node.Left == nil && node.Right != nil {
            res.WriteString("()")
        }
        preorder(node.Left)
        preorder(node.Right)
        res.WriteString(")")
    }

    preorder(root)
    s := res.String()
    return s[1 : len(s)-1]
}
```

```kotlin
class Solution {
    fun tree2str(root: TreeNode?): String {
        val res = StringBuilder()

        fun preorder(node: TreeNode?) {
            if (node == null) return
            res.append("(").append(node.`val`)
            if (node.left == null && node.right != null) {
                res.append("()")
            }
            preorder(node.left)
            preorder(node.right)
            res.append(")")
        }

        preorder(root)
        return res.toString().substring(1, res.length - 1)
    }
}
```

```swift
class Solution {
    func tree2str(_ root: TreeNode?) -> String {
        var res = [String]()

        func preorder(_ node: TreeNode?) {
            guard let node = node else { return }
            res.append("(")
            res.append(String(node.val))
            if node.left == nil && node.right != nil {
                res.append("()")
            }
            preorder(node.left)
            preorder(node.right)
            res.append(")")
        }

        preorder(root)
        let str = res.joined()
        return String(str.dropFirst().dropLast())
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Iterative DFS

### Intuition
We can convert the recursive approach to iterative using an explicit stack. The challenge is knowing when we have finished processing a node's subtrees so we can add the closing parenthesis. We track the last visited node to determine whether we are returning from the right subtree.

### Algorithm
1. Use a stack for traversal and track the last visited node.
2. While current node exists or stack is not empty:
   - If current exists, append `"(val"`, handle missing left child if right exists, push to stack, move to left child.
   - Otherwise, peek at the stack top:
     - If right child exists and was not last visited, move to right child.
     - Otherwise, pop the node, append `")"`, mark it as last visited.
3. Remove the outer parentheses from the result and return.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def tree2str(self, root: Optional[TreeNode]) -> str:
        if not root:
            return ""

        res = []
        stack = []
        last_visited = None
        cur = root

        while cur or stack:
            if cur:
                res.append(f"({cur.val}")
                if not cur.left and cur.right:
                    res.append("()")

                stack.append(cur)
                cur = cur.left
            else:
                top = stack[-1]
                if top.right and last_visited != top.right:
                    cur = top.right
                else:
                    stack.pop()
                    res.append(")")
                    last_visited = top

        return "".join(res)[1:-1]
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
    public String tree2str(TreeNode root) {
        if (root == null) {
            return "";
        }

        StringBuilder res = new StringBuilder();
        Stack<TreeNode> stack = new Stack<>();
        TreeNode lastVisited = null;
        TreeNode cur = root;

        while (cur != null || !stack.isEmpty()) {
            if (cur != null) {
                res.append("(").append(cur.val);
                if (cur.left == null && cur.right != null) {
                    res.append("()");
                }

                stack.push(cur);
                cur = cur.left;
            } else {
                TreeNode top = stack.peek();
                if (top.right != null && lastVisited != top.right) {
                    cur = top.right;
                } else {
                    stack.pop();
                    res.append(")");
                    lastVisited = top;
                }
            }
        }

        return res.substring(1, res.length() - 1);
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
    string tree2str(TreeNode* root) {
        if (!root) {
            return "";
        }

        string res;
        stack<TreeNode*> stack;
        TreeNode* lastVisited = nullptr;
        TreeNode* cur = root;

        while (cur || !stack.empty()) {
            if (cur) {
                res += "(" + to_string(cur->val);
                if (!cur->left && cur->right) {
                    res += "()";
                }

                stack.push(cur);
                cur = cur->left;
            } else {
                TreeNode* top = stack.top();
                if (top->right && lastVisited != top->right) {
                    cur = top->right;
                } else {
                    stack.pop();
                    res += ")";
                    lastVisited = top;
                }
            }
        }

        return res.substr(1, res.size() - 2);
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
     * @return {string}
     */
    tree2str(root) {
        if (!root) {
            return '';
        }

        let res = [];
        let stack = [];
        let lastVisited = null;
        let cur = root;

        while (cur || stack.length > 0) {
            if (cur) {
                res.push(`(${cur.val}`);
                if (!cur.left && cur.right) {
                    res.push('()');
                }

                stack.push(cur);
                cur = cur.left;
            } else {
                let top = stack[stack.length - 1];
                if (top.right && lastVisited !== top.right) {
                    cur = top.right;
                } else {
                    stack.pop();
                    res.push(')');
                    lastVisited = top;
                }
            }
        }

        return res.join('').slice(1, -1);
    }
}
```

```csharp
public class Solution {
    public string Tree2str(TreeNode root) {
        if (root == null) {
            return "";
        }

        var res = new StringBuilder();
        var stack = new Stack<TreeNode>();
        TreeNode lastVisited = null;
        TreeNode cur = root;

        while (cur != null || stack.Count > 0) {
            if (cur != null) {
                res.Append("(").Append(cur.val);
                if (cur.left == null && cur.right != null) {
                    res.Append("()");
                }

                stack.Push(cur);
                cur = cur.left;
            } else {
                TreeNode top = stack.Peek();
                if (top.right != null && lastVisited != top.right) {
                    cur = top.right;
                } else {
                    stack.Pop();
                    res.Append(")");
                    lastVisited = top;
                }
            }
        }

        return res.ToString().Substring(1, res.Length - 2);
    }
}
```

```go
func tree2str(root *TreeNode) string {
    if root == nil {
        return ""
    }

    var res strings.Builder
    stack := []*TreeNode{}
    var lastVisited *TreeNode
    cur := root

    for cur != nil || len(stack) > 0 {
        if cur != nil {
            res.WriteString("(")
            res.WriteString(strconv.Itoa(cur.Val))
            if cur.Left == nil && cur.Right != nil {
                res.WriteString("()")
            }

            stack = append(stack, cur)
            cur = cur.Left
        } else {
            top := stack[len(stack)-1]
            if top.Right != nil && lastVisited != top.Right {
                cur = top.Right
            } else {
                stack = stack[:len(stack)-1]
                res.WriteString(")")
                lastVisited = top
            }
        }
    }

    s := res.String()
    return s[1 : len(s)-1]
}
```

```kotlin
class Solution {
    fun tree2str(root: TreeNode?): String {
        if (root == null) {
            return ""
        }

        val res = StringBuilder()
        val stack = ArrayDeque<TreeNode>()
        var lastVisited: TreeNode? = null
        var cur = root

        while (cur != null || stack.isNotEmpty()) {
            if (cur != null) {
                res.append("(").append(cur.`val`)
                if (cur.left == null && cur.right != null) {
                    res.append("()")
                }

                stack.addLast(cur)
                cur = cur.left
            } else {
                val top = stack.last()
                if (top.right != null && lastVisited != top.right) {
                    cur = top.right
                } else {
                    stack.removeLast()
                    res.append(")")
                    lastVisited = top
                }
            }
        }

        return res.toString().substring(1, res.length - 1)
    }
}
```

```swift
class Solution {
    func tree2str(_ root: TreeNode?) -> String {
        guard let root = root else {
            return ""
        }

        var res = [String]()
        var stack = [TreeNode]()
        var lastVisited: TreeNode? = nil
        var cur: TreeNode? = root

        while cur != nil || !stack.isEmpty {
            if let node = cur {
                res.append("(\(node.val)")
                if node.left == nil && node.right != nil {
                    res.append("()")
                }

                stack.append(node)
                cur = node.left
            } else {
                let top = stack.last!
                if top.right != nil && lastVisited !== top.right {
                    cur = top.right
                } else {
                    stack.removeLast()
                    res.append(")")
                    lastVisited = top
                }
            }
        }

        let str = res.joined()
        return String(str.dropFirst().dropLast())
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## Common Pitfalls

### Omitting Empty Parentheses for Missing Left Child
When only the right child exists, you must include empty parentheses `()` for the missing left child to preserve tree structure. Without this, the right child would be incorrectly interpreted as the left child during reconstruction.
```python
# Wrong: Missing empty parentheses
if right:
    return f"{cur}({right})"  # Output: "1(3)" instead of "1()(3)"

# Correct: Include empty parentheses for missing left
if right:
    return f"{cur}()({right})"
```

### Adding Unnecessary Parentheses for Missing Right Child
When only the left child exists, you should NOT add empty parentheses for the missing right child. The problem specifically states that empty parentheses for missing right children should be omitted since they don't affect tree reconstruction.
