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
    def getLonelyNodes(self, root: Optional[TreeNode]) -> List[int]:
        res = []

        def dfs(node):
            if not node:
                return
            if node.left and not node.right:
                res.append(node.left.val)
            if node.right and not node.left:
                res.append(node.right.val)
            dfs(node.left)
            dfs(node.right)

        dfs(root)
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
    public List<Integer> getLonelyNodes(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        dfs(root, res);
        return res;
    }

    private void dfs(TreeNode node, List<Integer> res) {
        if (node == null) {
            return;
        }
        if (node.left != null && node.right == null) {
            res.add(node.left.val);
        }
        if (node.right != null && node.left == null) {
            res.add(node.right.val);
        }
        dfs(node.left, res);
        dfs(node.right, res);
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
    vector<int> getLonelyNodes(TreeNode* root) {
        vector<int> res;
        dfs(root, res);
        return res;
    }

private:
    void dfs(TreeNode* node, vector<int>& res) {
        if (!node) {
            return;
        }
        if (node->left && !node->right) {
            res.push_back(node->left->val);
        }
        if (node->right && !node->left) {
            res.push_back(node->right->val);
        }
        dfs(node->left, res);
        dfs(node->right, res);
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
    getLonelyNodes(root) {
        const res = [];

        const dfs = (node) => {
            if (!node) {
                return;
            }
            if (node.left && !node.right) {
                res.push(node.left.val);
            }
            if (node.right && !node.left) {
                res.push(node.right.val);
            }
            dfs(node.left);
            dfs(node.right);
        };

        dfs(root);
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
 *     public TreeNode(int val = 0, TreeNode left = null, TreeNode right = null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
public class Solution {
    public List<int> GetLonelyNodes(TreeNode root) {
        var res = new List<int>();
        Dfs(root, res);
        return res;
    }

    private void Dfs(TreeNode node, List<int> res) {
        if (node == null) {
            return;
        }
        if (node.left != null && node.right == null) {
            res.Add(node.left.val);
        }
        if (node.right != null && node.left == null) {
            res.Add(node.right.val);
        }
        Dfs(node.left, res);
        Dfs(node.right, res);
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
func getLonelyNodes(root *TreeNode) []int {
    res := []int{}

    var dfs func(node *TreeNode)
    dfs = func(node *TreeNode) {
        if node == nil {
            return
        }
        if node.Left != nil && node.Right == nil {
            res = append(res, node.Left.Val)
        }
        if node.Right != nil && node.Left == nil {
            res = append(res, node.Right.Val)
        }
        dfs(node.Left)
        dfs(node.Right)
    }

    dfs(root)
    return res
}
```

```kotlin
/**
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun getLonelyNodes(root: TreeNode?): List<Int> {
        val res = mutableListOf<Int>()
        dfs(root, res)
        return res
    }

    private fun dfs(node: TreeNode?, res: MutableList<Int>) {
        if (node == null) {
            return
        }
        val left = node.left
        val right = node.right
        if (left != null && right == null) {
            res.add(left.`val`)
        }
        if (right != null && left == null) {
            res.add(right.`val`)
        }
        dfs(left, res)
        dfs(right, res)
    }
}
```

```swift
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     var val: Int
 *     var left: TreeNode?
 *     var right: TreeNode?
 *     init(_ val: Int) {
 *         self.val = val
 *         self.left = nil
 *         self.right = nil
 *     }
 * }
 */
class Solution {
    func getLonelyNodes(_ root: TreeNode?) -> [Int] {
        var res = [Int]()

        func dfs(_ node: TreeNode?) {
            guard let node = node else {
                return
            }
            if let left = node.left, node.right == nil {
                res.append(left.val)
            }
            if let right = node.right, node.left == nil {
                res.append(right.val)
            }
            dfs(node.left)
            dfs(node.right)
        }

        dfs(root)
        return res
    }
}
```

```rust
// Definition for a binary tree node.
// #[derive(Debug, PartialEq, Eq)]
// pub struct TreeNode {
//     pub val: i32,
//     pub left: Option<Rc<RefCell<TreeNode>>>,
//     pub right: Option<Rc<RefCell<TreeNode>>>,
// }
//
// impl TreeNode {
//     #[inline]
//     pub fn new(val: i32) -> Self {
//         TreeNode {
//             val,
//             left: None,
//             right: None,
//         }
//     }
// }

use std::rc::Rc;
use std::cell::RefCell;

impl Solution {
    pub fn get_lonely_nodes(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<i32> {
        let mut res = Vec::new();
        Self::dfs(&root, &mut res);
        res
    }

    fn dfs(node: &Option<Rc<RefCell<TreeNode>>>, res: &mut Vec<i32>) {
        if let Some(n) = node {
            let n = n.borrow();
            match (&n.left, &n.right) {
                (Some(left), None) => res.push(left.borrow().val),
                (None, Some(right)) => res.push(right.borrow().val),
                _ => {}
            }
            Self::dfs(&n.left, res);
            Self::dfs(&n.right, res);
        }
    }
}
```

```typescript
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
    getLonelyNodes(root: TreeNode | null): number[] {
        const res: number[] = [];

        const dfs = (node: TreeNode | null): void => {
            if (!node) {
                return;
            }
            if (node.left && !node.right) {
                res.push(node.left.val);
            }
            if (node.right && !node.left) {
                res.push(node.right.val);
            }
            dfs(node.left);
            dfs(node.right);
        };

        dfs(root);
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for the recursion stack and the output list.

> Where $n$ is the number of nodes in the tree.

---

## 2. Iterative DFS

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def getLonelyNodes(self, root: Optional[TreeNode]) -> List[int]:
        res = []
        stack = [root]
        while stack:
            node = stack.pop()
            if node.left and not node.right:
                res.append(node.left.val)
            if node.right and not node.left:
                res.append(node.right.val)
            if node.left:
                stack.append(node.left)
            if node.right:
                stack.append(node.right)
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
    public List<Integer> getLonelyNodes(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            if (node.left != null && node.right == null) {
                res.add(node.left.val);
            }
            if (node.right != null && node.left == null) {
                res.add(node.right.val);
            }
            if (node.left != null) {
                stack.push(node.left);
            }
            if (node.right != null) {
                stack.push(node.right);
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
    vector<int> getLonelyNodes(TreeNode* root) {
        vector<int> res;
        stack<TreeNode*> stk;
        stk.push(root);
        while (!stk.empty()) {
            TreeNode* node = stk.top();
            stk.pop();
            if (node->left && !node->right) {
                res.push_back(node->left->val);
            }
            if (node->right && !node->left) {
                res.push_back(node->right->val);
            }
            if (node->left) {
                stk.push(node->left);
            }
            if (node->right) {
                stk.push(node->right);
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
    getLonelyNodes(root) {
        const res = [];
        const stack = [root];
        while (stack.length) {
            const node = stack.pop();
            if (node.left && !node.right) {
                res.push(node.left.val);
            }
            if (node.right && !node.left) {
                res.push(node.right.val);
            }
            if (node.left) {
                stack.push(node.left);
            }
            if (node.right) {
                stack.push(node.right);
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
 *     public TreeNode(int val = 0, TreeNode left = null, TreeNode right = null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
public class Solution {
    public List<int> GetLonelyNodes(TreeNode root) {
        var res = new List<int>();
        var stack = new Stack<TreeNode>();
        stack.Push(root);
        while (stack.Count > 0) {
            TreeNode node = stack.Pop();
            if (node.left != null && node.right == null) {
                res.Add(node.left.val);
            }
            if (node.right != null && node.left == null) {
                res.Add(node.right.val);
            }
            if (node.left != null) {
                stack.Push(node.left);
            }
            if (node.right != null) {
                stack.Push(node.right);
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
func getLonelyNodes(root *TreeNode) []int {
    res := []int{}
    stack := []*TreeNode{root}
    for len(stack) > 0 {
        node := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        if node.Left != nil && node.Right == nil {
            res = append(res, node.Left.Val)
        }
        if node.Right != nil && node.Left == nil {
            res = append(res, node.Right.Val)
        }
        if node.Left != nil {
            stack = append(stack, node.Left)
        }
        if node.Right != nil {
            stack = append(stack, node.Right)
        }
    }
    return res
}
```

```kotlin
/**
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun getLonelyNodes(root: TreeNode?): List<Int> {
        val res = mutableListOf<Int>()
        if (root == null) {
            return res
        }
        val stack = ArrayDeque<TreeNode>()
        stack.addLast(root)
        while (stack.isNotEmpty()) {
            val node = stack.removeLast()
            val left = node.left
            val right = node.right
            if (left != null && right == null) {
                res.add(left.`val`)
            }
            if (right != null && left == null) {
                res.add(right.`val`)
            }
            if (left != null) {
                stack.addLast(left)
            }
            if (right != null) {
                stack.addLast(right)
            }
        }
        return res
    }
}
```

```swift
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     var val: Int
 *     var left: TreeNode?
 *     var right: TreeNode?
 *     init(_ val: Int) {
 *         self.val = val
 *         self.left = nil
 *         self.right = nil
 *     }
 * }
 */
class Solution {
    func getLonelyNodes(_ root: TreeNode?) -> [Int] {
        var res = [Int]()
        guard let root = root else {
            return res
        }
        var stack = [root]
        while let node = stack.popLast() {
            if let left = node.left, node.right == nil {
                res.append(left.val)
            }
            if let right = node.right, node.left == nil {
                res.append(right.val)
            }
            if let left = node.left {
                stack.append(left)
            }
            if let right = node.right {
                stack.append(right)
            }
        }
        return res
    }
}
```

```rust
// Definition for a binary tree node.
// #[derive(Debug, PartialEq, Eq)]
// pub struct TreeNode {
//     pub val: i32,
//     pub left: Option<Rc<RefCell<TreeNode>>>,
//     pub right: Option<Rc<RefCell<TreeNode>>>,
// }
//
// impl TreeNode {
//     #[inline]
//     pub fn new(val: i32) -> Self {
//         TreeNode {
//             val,
//             left: None,
//             right: None,
//         }
//     }
// }

use std::rc::Rc;
use std::cell::RefCell;

impl Solution {
    pub fn get_lonely_nodes(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<i32> {
        let mut res = Vec::new();
        let mut stack = Vec::new();
        if let Some(r) = root {
            stack.push(r);
        }
        while let Some(node) = stack.pop() {
            let n = node.borrow();
            match (&n.left, &n.right) {
                (Some(left), None) => res.push(left.borrow().val),
                (None, Some(right)) => res.push(right.borrow().val),
                _ => {}
            }
            if let Some(left) = &n.left {
                stack.push(Rc::clone(left));
            }
            if let Some(right) = &n.right {
                stack.push(Rc::clone(right));
            }
        }
        res
    }
}
```

```typescript
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
    getLonelyNodes(root: TreeNode | null): number[] {
        const res: number[] = [];
        if (!root) {
            return res;
        }
        const stack: TreeNode[] = [root];
        while (stack.length) {
            const node = stack.pop() as TreeNode;
            if (node.left && !node.right) {
                res.push(node.left.val);
            }
            if (node.right && !node.left) {
                res.push(node.right.val);
            }
            if (node.left) {
                stack.push(node.left);
            }
            if (node.right) {
                stack.push(node.right);
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

> Where $n$ is the number of nodes in the tree.

---

## 3. Breadth First Search

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def getLonelyNodes(self, root: Optional[TreeNode]) -> List[int]:
        res = []
        q = deque([root])
        while q:
            node = q.popleft()
            if node.left and not node.right:
                res.append(node.left.val)
            if node.right and not node.left:
                res.append(node.right.val)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
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
    public List<Integer> getLonelyNodes(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            TreeNode node = q.poll();
            if (node.left != null && node.right == null) {
                res.add(node.left.val);
            }
            if (node.right != null && node.left == null) {
                res.add(node.right.val);
            }
            if (node.left != null) {
                q.offer(node.left);
            }
            if (node.right != null) {
                q.offer(node.right);
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
    vector<int> getLonelyNodes(TreeNode* root) {
        vector<int> res;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            TreeNode* node = q.front();
            q.pop();
            if (node->left && !node->right) {
                res.push_back(node->left->val);
            }
            if (node->right && !node->left) {
                res.push_back(node->right->val);
            }
            if (node->left) {
                q.push(node->left);
            }
            if (node->right) {
                q.push(node->right);
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
    getLonelyNodes(root) {
        const res = [];
        const q = new Queue();
        q.push(root);
        while (!q.isEmpty()) {
            const node = q.pop();
            if (node.left && !node.right) {
                res.push(node.left.val);
            }
            if (node.right && !node.left) {
                res.push(node.right.val);
            }
            if (node.left) {
                q.push(node.left);
            }
            if (node.right) {
                q.push(node.right);
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
 *     public TreeNode(int val = 0, TreeNode left = null, TreeNode right = null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
public class Solution {
    public List<int> GetLonelyNodes(TreeNode root) {
        var res = new List<int>();
        var q = new Queue<TreeNode>();
        q.Enqueue(root);
        while (q.Count > 0) {
            TreeNode node = q.Dequeue();
            if (node.left != null && node.right == null) {
                res.Add(node.left.val);
            }
            if (node.right != null && node.left == null) {
                res.Add(node.right.val);
            }
            if (node.left != null) {
                q.Enqueue(node.left);
            }
            if (node.right != null) {
                q.Enqueue(node.right);
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
func getLonelyNodes(root *TreeNode) []int {
    res := []int{}
    q := []*TreeNode{root}
    for len(q) > 0 {
        node := q[0]
        q = q[1:]
        if node.Left != nil && node.Right == nil {
            res = append(res, node.Left.Val)
        }
        if node.Right != nil && node.Left == nil {
            res = append(res, node.Right.Val)
        }
        if node.Left != nil {
            q = append(q, node.Left)
        }
        if node.Right != nil {
            q = append(q, node.Right)
        }
    }
    return res
}
```

```kotlin
/**
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun getLonelyNodes(root: TreeNode?): List<Int> {
        val res = mutableListOf<Int>()
        if (root == null) {
            return res
        }
        val q = ArrayDeque<TreeNode>()
        q.addLast(root)
        while (q.isNotEmpty()) {
            val node = q.removeFirst()
            val left = node.left
            val right = node.right
            if (left != null && right == null) {
                res.add(left.`val`)
            }
            if (right != null && left == null) {
                res.add(right.`val`)
            }
            if (left != null) {
                q.addLast(left)
            }
            if (right != null) {
                q.addLast(right)
            }
        }
        return res
    }
}
```

```swift
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     var val: Int
 *     var left: TreeNode?
 *     var right: TreeNode?
 *     init(_ val: Int) {
 *         self.val = val
 *         self.left = nil
 *         self.right = nil
 *     }
 * }
 */
class Solution {
    func getLonelyNodes(_ root: TreeNode?) -> [Int] {
        var res = [Int]()
        guard let root = root else {
            return res
        }
        var q = [root]
        var head = 0
        while head < q.count {
            let node = q[head]
            head += 1
            if let left = node.left, node.right == nil {
                res.append(left.val)
            }
            if let right = node.right, node.left == nil {
                res.append(right.val)
            }
            if let left = node.left {
                q.append(left)
            }
            if let right = node.right {
                q.append(right)
            }
        }
        return res
    }
}
```

```rust
// Definition for a binary tree node.
// #[derive(Debug, PartialEq, Eq)]
// pub struct TreeNode {
//     pub val: i32,
//     pub left: Option<Rc<RefCell<TreeNode>>>,
//     pub right: Option<Rc<RefCell<TreeNode>>>,
// }
//
// impl TreeNode {
//     #[inline]
//     pub fn new(val: i32) -> Self {
//         TreeNode {
//             val,
//             left: None,
//             right: None,
//         }
//     }
// }

use std::rc::Rc;
use std::cell::RefCell;
use std::collections::VecDeque;

impl Solution {
    pub fn get_lonely_nodes(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<i32> {
        let mut res = Vec::new();
        let mut q = VecDeque::new();
        if let Some(r) = root {
            q.push_back(r);
        }
        while let Some(node) = q.pop_front() {
            let n = node.borrow();
            match (&n.left, &n.right) {
                (Some(left), None) => res.push(left.borrow().val),
                (None, Some(right)) => res.push(right.borrow().val),
                _ => {}
            }
            if let Some(left) = &n.left {
                q.push_back(Rc::clone(left));
            }
            if let Some(right) = &n.right {
                q.push_back(Rc::clone(right));
            }
        }
        res
    }
}
```

```typescript
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
    getLonelyNodes(root: TreeNode | null): number[] {
        const res: number[] = [];
        if (!root) {
            return res;
        }
        const q = new Queue();
        q.push(root);
        while (!q.isEmpty()) {
            const node = q.pop() as TreeNode;
            if (node.left && !node.right) {
                res.push(node.left.val);
            }
            if (node.right && !node.left) {
                res.push(node.right.val);
            }
            if (node.left) {
                q.push(node.left);
            }
            if (node.right) {
                q.push(node.right);
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

> Where $n$ is the number of nodes in the tree.
