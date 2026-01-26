## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Binary Tree Structure** - Understanding how nodes connect via left and right children
- **Recursion** - Using recursive calls to naturally traverse tree structures
- **Stacks** - Simulating recursion iteratively by explicitly managing the call stack and visit states

---

## 1. Depth First Search

### Intuition
Postorder traversal visits nodes in the order: left subtree, right subtree, current node. This is useful when we need to process children before their parent, such as when deleting nodes or evaluating expression trees. Recursion naturally handles this by processing both subtrees before adding the current node's value.

### Algorithm
1. Create a result list to store the node values.
2. Define a recursive helper function that takes a `node` as input.
3. If the `node` is `null`, return immediately (base case).
4. Recursively call the function on the left child.
5. Recursively call the function on the right child.
6. Add the current node's value to the result list.
7. Return the result list after traversing the entire tree.

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

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func postorderTraversal(root *TreeNode) []int {
    res := []int{}
    var postorder func(node *TreeNode)
    postorder = func(node *TreeNode) {
        if node == nil {
            return
        }
        postorder(node.Left)
        postorder(node.Right)
        res = append(res, node.Val)
    }
    postorder(root)
    return res
}
```

```kotlin
/**
 * Example:
 * var ti = TreeNode(5)
 * var v = ti.`val`
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun postorderTraversal(root: TreeNode?): List<Int> {
        val res = mutableListOf<Int>()
        fun postorder(node: TreeNode?) {
            if (node == null) return
            postorder(node.left)
            postorder(node.right)
            res.add(node.`val`)
        }
        postorder(root)
        return res
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
    func postorderTraversal(_ root: TreeNode?) -> [Int] {
        var res = [Int]()
        func postorder(_ node: TreeNode?) {
            guard let node = node else { return }
            postorder(node.left)
            postorder(node.right)
            res.append(node.val)
        }
        postorder(root)
        return res
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

### Intuition
We use a stack with a `visited` flag to track whether we've already processed a node's children. When we first encounter a node, we push it back with a `visited` flag set to `true`, then push its children. On the second visit (when the flag is `true`), we know both children have been processed, so we add the node's value to the result.

### Algorithm
1. Initialize a stack with the root node paired with a `false` visited flag.
2. While the stack is not empty:
   - Pop a node and its `visited` flag.
   - If the node is `null`, continue.
   - If `visited` is `true`, add the node's value to the result.
   - Otherwise, push the node back with `visited` set to `true`, then push the right child (`visited` `false`), then the left child (`visited` `false`).
3. Return the result list.

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

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func postorderTraversal(root *TreeNode) []int {
    type stackItem struct {
        node  *TreeNode
        visit bool
    }
    stack := []stackItem{{root, false}}
    res := []int{}

    for len(stack) > 0 {
        item := stack[len(stack)-1]
        stack = stack[:len(stack)-1]

        if item.node != nil {
            if item.visit {
                res = append(res, item.node.Val)
            } else {
                stack = append(stack, stackItem{item.node, true})
                stack = append(stack, stackItem{item.node.Right, false})
                stack = append(stack, stackItem{item.node.Left, false})
            }
        }
    }

    return res
}
```

```kotlin
/**
 * Example:
 * var ti = TreeNode(5)
 * var v = ti.`val`
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun postorderTraversal(root: TreeNode?): List<Int> {
        val stack = ArrayDeque<Pair<TreeNode?, Boolean>>()
        val res = mutableListOf<Int>()

        stack.addLast(Pair(root, false))

        while (stack.isNotEmpty()) {
            val (cur, v) = stack.removeLast()

            if (cur != null) {
                if (v) {
                    res.add(cur.`val`)
                } else {
                    stack.addLast(Pair(cur, true))
                    stack.addLast(Pair(cur.right, false))
                    stack.addLast(Pair(cur.left, false))
                }
            }
        }

        return res
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
    func postorderTraversal(_ root: TreeNode?) -> [Int] {
        var stack: [(TreeNode?, Bool)] = [(root, false)]
        var res = [Int]()

        while !stack.isEmpty {
            let (cur, v) = stack.removeLast()

            if let cur = cur {
                if v {
                    res.append(cur.val)
                } else {
                    stack.append((cur, true))
                    stack.append((cur.right, false))
                    stack.append((cur.left, false))
                }
            }
        }

        return res
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

### Intuition
Postorder is the reverse of a modified preorder traversal. If we traverse in the order: current, right, left (instead of current, left, right), and then reverse the result, we get the postorder sequence. This avoids the complexity of tracking visited nodes.

### Algorithm
1. Initialize an empty result list and an empty stack.
2. Set the current node to the root.
3. While the current node is not `null` or the stack is not empty:
   - If the current node is not `null`, add its value to the result, push it onto the stack, and move to the right child.
   - Otherwise, pop a node from the stack and move to its left child.
4. Reverse the result list to get the correct postorder sequence.
5. Return the result list.

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

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func postorderTraversal(root *TreeNode) []int {
    res := []int{}
    stack := []*TreeNode{}
    cur := root

    for cur != nil || len(stack) > 0 {
        if cur != nil {
            res = append(res, cur.Val)
            stack = append(stack, cur)
            cur = cur.Right
        } else {
            cur = stack[len(stack)-1]
            stack = stack[:len(stack)-1]
            cur = cur.Left
        }
    }

    for i, j := 0, len(res)-1; i < j; i, j = i+1, j-1 {
        res[i], res[j] = res[j], res[i]
    }
    return res
}
```

```kotlin
/**
 * Example:
 * var ti = TreeNode(5)
 * var v = ti.`val`
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun postorderTraversal(root: TreeNode?): List<Int> {
        val res = mutableListOf<Int>()
        val stack = ArrayDeque<TreeNode>()
        var cur = root

        while (cur != null || stack.isNotEmpty()) {
            if (cur != null) {
                res.add(cur.`val`)
                stack.addLast(cur)
                cur = cur.right
            } else {
                cur = stack.removeLast()
                cur = cur.left
            }
        }

        res.reverse()
        return res
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
    func postorderTraversal(_ root: TreeNode?) -> [Int] {
        var res = [Int]()
        var stack = [TreeNode]()
        var cur = root

        while cur != nil || !stack.isEmpty {
            if cur != nil {
                res.append(cur!.val)
                stack.append(cur!)
                cur = cur?.right
            } else {
                cur = stack.removeLast()
                cur = cur?.left
            }
        }

        res.reverse()
        return res
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

### Intuition
Similar to the iterative approach that reverses a modified preorder, Morris Traversal for postorder works by performing a reverse preorder traversal (current, right, left) without using extra space for a stack. We use temporary thread links from the leftmost node of the right subtree back to the current node. After the traversal, we reverse the result.

### Algorithm
1. Initialize the current node to the root.
2. While the current node is not `null`:
   - If the current node has no right child, add its value to the result and move to the left child.
   - Otherwise, find the leftmost node in the right subtree.
   - If the leftmost node's left pointer is `null`, add the current value to the result, set the left pointer to the current node (create thread), and move to the right child.
   - If the left pointer already points to the current node, remove the thread and move to the left child.
3. Reverse the result list to get the correct postorder sequence.
4. Return the result list.

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

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func postorderTraversal(root *TreeNode) []int {
    res := []int{}
    cur := root

    for cur != nil {
        if cur.Right == nil {
            res = append(res, cur.Val)
            cur = cur.Left
        } else {
            prev := cur.Right
            for prev.Left != nil && prev.Left != cur {
                prev = prev.Left
            }

            if prev.Left == nil {
                res = append(res, cur.Val)
                prev.Left = cur
                cur = cur.Right
            } else {
                prev.Left = nil
                cur = cur.Left
            }
        }
    }

    for i, j := 0, len(res)-1; i < j; i, j = i+1, j-1 {
        res[i], res[j] = res[j], res[i]
    }
    return res
}
```

```kotlin
/**
 * Example:
 * var ti = TreeNode(5)
 * var v = ti.`val`
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun postorderTraversal(root: TreeNode?): List<Int> {
        val res = mutableListOf<Int>()
        var cur = root

        while (cur != null) {
            if (cur.right == null) {
                res.add(cur.`val`)
                cur = cur.left
            } else {
                var prev = cur.right
                while (prev?.left != null && prev.left != cur) {
                    prev = prev.left
                }

                if (prev?.left == null) {
                    res.add(cur.`val`)
                    prev?.left = cur
                    cur = cur.right
                } else {
                    prev.left = null
                    cur = cur.left
                }
            }
        }

        res.reverse()
        return res
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
    func postorderTraversal(_ root: TreeNode?) -> [Int] {
        var res = [Int]()
        var cur = root

        while cur != nil {
            if cur?.right == nil {
                res.append(cur!.val)
                cur = cur?.left
            } else {
                var prev = cur?.right
                while prev?.left != nil && prev?.left !== cur {
                    prev = prev?.left
                }

                if prev?.left == nil {
                    res.append(cur!.val)
                    prev?.left = cur
                    cur = cur?.right
                } else {
                    prev?.left = nil
                    cur = cur?.left
                }
            }
        }

        res.reverse()
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ space for the output array.

---

## Common Pitfalls

### Adding Node Value Before Recursing on Children
Postorder requires visiting children before the current node. Adding the value before recursive calls produces preorder traversal instead.
```python
# Wrong: this is preorder, not postorder
res.append(node.val)
postorder(node.left)
postorder(node.right)
```

### Wrong Child Order in Iterative Approach
In the iterative approach using reversal, you must traverse current -> right -> left, then reverse. Traversing current -> left -> right and reversing gives incorrect results.
