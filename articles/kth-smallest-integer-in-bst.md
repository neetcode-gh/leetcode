## 1. Brute Force

### Intuition  
A Binary Search Tree (BST) has a special property:  
- **Left subtree < root < right subtree**  
But this brute-force method does **not** use the BST property.

We simply:
1. Traverse the entire tree and collect all node values.
2. Sort the collected values.
3. The k-th smallest element is at index `k-1` in the sorted list.

---

### Algorithm  
1. Create an empty list `arr`.
2. Perform DFS on the tree:
   - For every node, append its value to `arr`.
3. Sort `arr`.
4. Return `arr[k-1]`.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        arr = []

        def dfs(node):
            if not node:
                return

            arr.append(node.val)
            dfs(node.left)
            dfs(node.right)

        dfs(root)
        arr.sort()
        return arr[k - 1]
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
    public int kthSmallest(TreeNode root, int k) {
        List<Integer> arr = new ArrayList<>();

        dfs(root, arr);
        Collections.sort(arr);
        return arr.get(k - 1);
    }

    private void dfs(TreeNode node, List<Integer> arr) {
        if (node == null) {
            return;
        }

        arr.add(node.val);
        dfs(node.left, arr);
        dfs(node.right, arr);
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
    int kthSmallest(TreeNode* root, int k) {
        vector<int> arr;
        dfs(root, arr);
        sort(arr.begin(), arr.end());
        return arr[k - 1];
    }

    void dfs(TreeNode* node, vector<int>& arr) {
        if (!node) return;
        arr.push_back(node->val);
        dfs(node->left, arr);
        dfs(node->right, arr);
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
     * @param {number} k
     * @return {number}
     */
    kthSmallest(root, k) {
        const arr = [];
        this.dfs(root, arr);
        arr.sort((a, b) => a - b);
        return arr[k - 1];
    }

    /**
     * @param {TreeNode} node
     * @param {number[]} arr
     */
    dfs(node, arr) {
        if (!node) return;
        arr.push(node.val);
        this.dfs(node.left, arr);
        this.dfs(node.right, arr);
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
    public int KthSmallest(TreeNode root, int k) {
        List<int> arr = new List<int>();
        Dfs(root, arr);
        arr.Sort();
        return arr[k - 1];
    }

    private void Dfs(TreeNode node, List<int> arr) {
        if (node == null) return;
        arr.Add(node.val);
        Dfs(node.left, arr);
        Dfs(node.right, arr);
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
func kthSmallest(root *TreeNode, k int) int {
    var arr []int

    var dfs func(node *TreeNode)
    dfs = func(node *TreeNode) {
        if node == nil {
            return
        }

        dfs(node.Left)
        arr = append(arr, node.Val)
        dfs(node.Right)
    }

    dfs(root)
    return arr[k-1]
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
    private val arr = mutableListOf<Int>()

    fun kthSmallest(root: TreeNode?, k: Int): Int {
        dfs(root)
        return arr[k - 1]
    }

    private fun dfs(node: TreeNode?) {
        if (node == null) {
            return
        }

        dfs(node.left)
        arr.add(node.`val`)
        dfs(node.right)
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
    func kthSmallest(_ root: TreeNode?, _ k: Int) -> Int {
        var arr = [Int]()

        func dfs(_ node: TreeNode?) {
            guard let node = node else { return }
            arr.append(node.val)
            dfs(node.left)
            dfs(node.right)
        }

        dfs(root)
        arr.sort()
        return arr[k - 1]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 2. Inorder Traversal

### Intuition  
A Binary Search Tree (BST) has an important property:

**Inorder Traversal (Left → Node → Right) always gives values in sorted order.**

So instead of collecting all values and sorting them manually, we can:
1. Do an inorder traversal.
2. This automatically produces values in ascending order.
3. The k-th element in this inorder list is the answer.

This makes the solution more efficient and uses the BST’s inherent structure.

---

### Algorithm  
1. Create an empty list `arr`.
2. Perform **inorder DFS**:
   - Visit the left subtree.
   - Add the current node’s value to `arr`.
   - Visit the right subtree.
3. After traversal, `arr` will be sorted.
4. Return `arr[k-1]`.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        arr = []

        def dfs(node):
            if not node:
                return

            dfs(node.left)
            arr.append(node.val)
            dfs(node.right)

        dfs(root)
        return arr[k - 1]
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
    public int kthSmallest(TreeNode root, int k) {
        List<Integer> arr = new ArrayList<>();

        dfs(root, arr);
        return arr.get(k - 1);
    }

    private void dfs(TreeNode node, List<Integer> arr) {
        if (node == null) {
            return;
        }

        dfs(node.left, arr);
        arr.add(node.val);
        dfs(node.right, arr);
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
    int kthSmallest(TreeNode* root, int k) {
        vector<int> arr;
        dfs(root, arr);
        return arr[k - 1];
    }

    void dfs(TreeNode* node, vector<int>& arr) {
        if (!node) return;
        dfs(node->left, arr);
        arr.push_back(node->val);
        dfs(node->right, arr);
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
     * @param {number} k
     * @return {number}
     */
    kthSmallest(root, k) {
        const arr = [];
        this.dfs(root, arr);
        return arr[k - 1];
    }

    /**
     * @param {TreeNode} node
     * @param {number[]} arr
     */
    dfs(node, arr) {
        if (!node) return;
        this.dfs(node.left, arr);
        arr.push(node.val);
        this.dfs(node.right, arr);
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
    public int KthSmallest(TreeNode root, int k) {
        List<int> arr = new List<int>();
        Dfs(root, arr);
        return arr[k - 1];
    }

    private void Dfs(TreeNode node, List<int> arr) {
        if (node == null) return;
        Dfs(node.left, arr);
        arr.Add(node.val);
        Dfs(node.right, arr);
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
func kthSmallest(root *TreeNode, k int) int {
    var arr []int

    var dfs func(node *TreeNode)
    dfs = func(node *TreeNode) {
        if node == nil {
            return
        }

        dfs(node.Left)
        arr = append(arr, node.Val)
        dfs(node.Right)
    }

    dfs(root)
    return arr[k-1]
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
    private val arr = mutableListOf<Int>()

    fun kthSmallest(root: TreeNode?, k: Int): Int {
        dfs(root)
        return arr[k - 1]
    }

    private fun dfs(node: TreeNode?) {
        if (node == null) {
            return
        }

        dfs(node.left)
        arr.add(node.`val`)
        dfs(node.right)
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
    func kthSmallest(_ root: TreeNode?, _ k: Int) -> Int {
        var arr = [Int]()

        func dfs(_ node: TreeNode?) {
            guard let node = node else { return }
            dfs(node.left)
            arr.append(node.val)
            dfs(node.right)
        }

        dfs(root)
        return arr[k - 1]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Recursive DFS (Optimal)

### Intuition  
In a BST, the **inorder traversal** (Left → Node → Right) naturally visits nodes in **sorted order**.

So instead of storing all values, we can:
- Traverse the tree in inorder,
- Count nodes as we visit them,
- Stop as soon as we visit the k-th smallest node.

This avoids extra space and stops early, making it more optimal.

---

### Algorithm  
1. Keep a counter `cnt = k`.
2. Perform an inorder DFS:
   - Go left.
   - When visiting a node:
     - Decrease `cnt`.
     - If `cnt == 0`, record this node’s value (this is the k-th smallest).
   - Go right.
3. Return the recorded value.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        cnt = k
        res = root.val

        def dfs(node):
            nonlocal cnt, res
            if not node:
                return

            dfs(node.left)
            cnt -= 1
            if cnt == 0:
                res = node.val
                return
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
    public int kthSmallest(TreeNode root, int k) {
        int[] tmp = new int[2];
        tmp[0] = k;
        dfs(root, tmp);
        return tmp[1];
    }

    private void dfs(TreeNode node, int[] tmp) {
        if (node == null) {
            return;
        }

        dfs(node.left, tmp);
        tmp[0] -= 1;
        if (tmp[0] == 0) {
            tmp[1] = node.val;
            return;
        }
        dfs(node.right, tmp);
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
    int kthSmallest(TreeNode* root, int k) {
        vector<int> tmp(2);
        tmp[0] = k;
        dfs(root, tmp);
        return tmp[1];
    }

    void dfs(TreeNode* node, vector<int>& tmp) {
        if (!node) return;
        dfs(node->left, tmp);
        tmp[0]--;
        if (tmp[0] == 0) {
            tmp[1] = node->val;
            return;
        }
        dfs(node->right, tmp);
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
     * @param {number} k
     * @return {number}
     */
    kthSmallest(root, k) {
        const tmp = new Int32Array(2);
        tmp[0] = k;
        this.dfs(root, tmp);
        return tmp[1];
    }

    /**
     * @param {TreeNode} node
     * @param {number[]} tmp
     */
    dfs(node, tmp) {
        if (!node) return;
        this.dfs(node.left, tmp);
        tmp[0]--;
        if (tmp[0] === 0) {
            tmp[1] = node.val;
            return;
        }
        this.dfs(node.right, tmp);
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
    public int KthSmallest(TreeNode root, int k) {
        int[] tmp = new int[2];
        tmp[0] = k;
        Dfs(root, tmp);
        return tmp[1];
    }

    private void Dfs(TreeNode node, int[] tmp) {
        if (node == null) return;
        Dfs(node.left, tmp);
        tmp[0]--;
        if (tmp[0] == 0) {
            tmp[1] = node.val;
            return;
        }
        Dfs(node.right, tmp);
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
func kthSmallest(root *TreeNode, k int) int {
    cnt, res := k, 0

    var dfs func(node *TreeNode)
    dfs = func(node *TreeNode) {
        if node == nil {
            return
        }

        dfs(node.Left)
        cnt--
        if cnt == 0 {
            res = node.Val
            return
        }
        dfs(node.Right)
    }

    dfs(root)
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
    private var cnt = 0
    private var res = 0

    fun kthSmallest(root: TreeNode?, k: Int): Int {
        cnt = k
        dfs(root)
        return res
    }

    private fun dfs(node: TreeNode?) {
        if (node == null) {
            return
        }

        dfs(node.left)
        cnt--
        if (cnt == 0) {
            res = node.`val`
            return
        }
        dfs(node.right)
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
    func kthSmallest(_ root: TreeNode?, _ k: Int) -> Int {
        var cnt = k
        var res = root!.val

        func dfs(_ node: TreeNode?) {
            guard let node = node else { return }

            dfs(node.left)
            cnt -= 1
            if cnt == 0 {
                res = node.val
                return
            }
            dfs(node.right)
        }

        dfs(root)
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Iterative DFS (Optimal)

### Intuition
In a BST, an **inorder traversal** (left → node → right) gives nodes in **sorted order**.  
Instead of recursion, we simulate this traversal with a **stack**:

- Push all left nodes (go as deep as possible).
- Pop the top node → this is the next smallest value.
- Move to its right subtree and repeat.
- When we pop the k-th node, that's our answer.

This way, we only visit nodes until we reach the k-th smallest — no need to traverse the whole tree.

---

### Algorithm
1. Initialize an empty stack and set `curr = root`.
2. While either stack is not empty or `curr` is not null:
   - Push all left nodes into the stack (`curr = curr.left`).
   - Pop from the stack → this is the next smallest node.
   - Decrement `k`. If `k == 0`, return that node's value.
   - Move to the right subtree (`curr = curr.right`).
3. The popped k-th node is the answer.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        stack = []
        curr = root

        while stack or curr:
            while curr:
                stack.append(curr)
                curr = curr.left
            curr = stack.pop()
            k -= 1
            if k == 0:
                return curr.val
            curr = curr.right
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

class Solution {
    public int kthSmallest(TreeNode root, int k) {
        Stack<TreeNode> stack = new Stack<>();
        TreeNode curr = root;

        while (!stack.isEmpty() || curr != null) {
            while (curr != null) {
                stack.push(curr);
                curr = curr.left;
            }
            curr = stack.pop();
            k--;
            if (k == 0) {
                return curr.val;
            }
            curr = curr.right;
        }

        return -1;
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
    int kthSmallest(TreeNode* root, int k) {
        stack<TreeNode*> stack;
        TreeNode* curr = root;

        while (!stack.empty() || curr != nullptr) {
            while (curr != nullptr) {
                stack.push(curr);
                curr = curr->left;
            }
            curr = stack.top();
            stack.pop();
            k--;
            if (k == 0) {
                return curr->val;
            }
            curr = curr->right;
        }

        return -1;
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
     * @param {number} k
     * @return {number}
     */
    kthSmallest(root, k) {
        let stack = [];
        let curr = root;

        while (stack.length > 0 || curr !== null) {
            while (curr !== null) {
                stack.push(curr);
                curr = curr.left;
            }
            curr = stack.pop();
            k--;
            if (k === 0) {
                return curr.val;
            }
            curr = curr.right;
        }
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
    public int KthSmallest(TreeNode root, int k) {
        Stack<TreeNode> stack = new Stack<TreeNode>();
        TreeNode curr = root;

        while (stack.Count > 0 || curr != null) {
            while (curr != null) {
                stack.Push(curr);
                curr = curr.left;
            }
            curr = stack.Pop();
            k--;
            if (k == 0) {
                return curr.val;
            }
            curr = curr.right;
        }

        return -1;
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
func kthSmallest(root *TreeNode, k int) int {
    stack := []*TreeNode{}
    curr := root

    for len(stack) > 0 || curr != nil {
        for curr != nil {
            stack = append(stack, curr)
            curr = curr.Left
        }

        curr = stack[len(stack)-1]
        stack = stack[:len(stack)-1]

        k--
        if k == 0 {
            return curr.Val
        }

        curr = curr.Right
    }

    return 0
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
    fun kthSmallest(root: TreeNode?, k: Int): Int {
        val stack = mutableListOf<TreeNode>()
        var curr: TreeNode? = root
        var k = k

        while (stack.isNotEmpty() || curr != null) {
            while (curr != null) {
                stack.add(curr)
                curr = curr.left
            }

            curr = stack.removeLast()
            k--
            if (k == 0) {
                return curr.`val`
            }

            curr = curr.right
        }

        return 0
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
    func kthSmallest(_ root: TreeNode?, _ k: Int) -> Int {
        var stack = [TreeNode]()
        var curr = root
        var k = k

        while !stack.isEmpty || curr != nil {
            while curr != nil {
                stack.append(curr!)
                curr = curr?.left
            }
            curr = stack.removeLast()
            k -= 1
            if k == 0 {
                return curr!.val
            }
            curr = curr?.right
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 5. Morris Traversal

### Intuition
Inorder traversal of a BST gives values in **sorted order**, so the k-th visited node is the k-th smallest.  
But recursion and stacks use extra space.

**Morris Traversal** allows us to perform inorder traversal using **O(1) extra space**, by temporarily creating
a “thread” (a right pointer) from a node’s predecessor back to the node.

For each node:
- If it has no left child → visit it directly.
- If it has a left child → find its inorder predecessor.
  - If the predecessor’s right pointer is empty → create a temporary link to the current node and move left.
  - If the predecessor’s right pointer already points to the current node → remove the link, visit the node, and move right.

We decrement `k` each time we “visit” a node.  
The node where `k` becomes 0 is the **k-th smallest**.

This works because we simulate the inorder order without extra memory.

---

### Algorithm
1. Set `curr = root`.
2. While `curr` is not null:
   - **Case 1: No left child**
     - Visit `curr` (decrement `k`).
     - If `k == 0`, return `curr.val`.
     - Move to `curr.right`.
   - **Case 2: Has a left child**
     - Find the inorder predecessor (`pred` = rightmost node in left subtree).
     - If `pred.right` is null:
       - Create a temporary thread: `pred.right = curr`.
       - Move `curr` to its left child.
     - Else (thread already exists):
       - Remove the thread: `pred.right = None`.
       - Visit `curr` (decrement `k`).
       - If `k == 0`, return `curr.val`.
       - Move to `curr.right`.
3. If traversal ends without finding k nodes, return `-1`.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        curr = root

        while curr:
            if not curr.left:
                k -= 1
                if k == 0:
                    return curr.val
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
                    k -= 1
                    if k == 0:
                        return curr.val
                    curr = curr.right

        return -1
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
    public int kthSmallest(TreeNode root, int k) {
        TreeNode curr = root;

        while (curr != null) {
            if (curr.left == null) {
                k--;
                if (k == 0) return curr.val;
                curr = curr.right;
            } else {
                TreeNode pred = curr.left;
                while (pred.right != null && pred.right != curr)
                    pred = pred.right;

                if (pred.right == null) {
                    pred.right = curr;
                    curr = curr.left;
                } else {
                    pred.right = null;
                    k--;
                    if (k == 0) return curr.val;
                    curr = curr.right;
                }
            }
        }
        return -1;
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
    int kthSmallest(TreeNode* root, int k) {
        TreeNode* curr = root;

        while (curr) {
            if (!curr->left) {
                k--;
                if (k == 0) return curr->val;
                curr = curr->right;
            } else {
                TreeNode* pred = curr->left;
                while (pred->right && pred->right != curr)
                    pred = pred->right;

                if (!pred->right) {
                    pred->right = curr;
                    curr = curr->left;
                } else {
                    pred->right = nullptr;
                    k--;
                    if (k == 0) return curr->val;
                    curr = curr->right;
                }
            }
        }
        return -1;
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
     * @param {number} k
     * @return {number}
     */
    kthSmallest(root, k) {
        let curr = root;

        while (curr) {
            if (!curr.left) {
                k--;
                if (k === 0) return curr.val;
                curr = curr.right;
            } else {
                let pred = curr.left;
                while (pred.right && pred.right !== curr) pred = pred.right;

                if (!pred.right) {
                    pred.right = curr;
                    curr = curr.left;
                } else {
                    pred.right = null;
                    k--;
                    if (k === 0) return curr.val;
                    curr = curr.right;
                }
            }
        }
        return -1;
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
    public int KthSmallest(TreeNode root, int k) {
        TreeNode curr = root;

        while (curr != null) {
            if (curr.left == null) {
                k--;
                if (k == 0) return curr.val;
                curr = curr.right;
            } else {
                TreeNode pred = curr.left;
                while (pred.right != null && pred.right != curr)
                    pred = pred.right;

                if (pred.right == null) {
                    pred.right = curr;
                    curr = curr.left;
                } else {
                    pred.right = null;
                    k--;
                    if (k == 0) return curr.val;
                    curr = curr.right;
                }
            }
        }
        return -1;
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
func kthSmallest(root *TreeNode, k int) int {
    curr := root
    for {
        if curr.Left == nil {
            k--
            if k == 0 {
                return curr.Val
            }
            curr = curr.Right
        } else {
            pred := curr.Left
            for pred.Right != nil && pred.Right != curr {
                pred = pred.Right
            }
            if pred.Right == nil {
                pred.Right = curr
                curr = curr.Left
            } else {
                pred.Right = nil
                k--
                if k == 0 {
                    return curr.Val
                }
                curr = curr.Right
            }
        }
    }
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
    fun kthSmallest(root: TreeNode?, k: Int): Int {
        var curr: TreeNode? = root
        var k = k
        while (true) {
            if (curr?.left == null) {
                k--
                if (k == 0) {
                    return curr!!.`val`
                }
                curr = curr?.right
            } else {
                var pred = curr.left
                while (pred?.right != null && pred.right != curr) {
                    pred = pred.right
                }
                if (pred?.right == null) {
                    pred.right = curr
                    curr = curr.left
                } else {
                    pred.right = null
                    k--
                    if (k == 0) {
                        return curr!!.`val`
                    }
                    curr = curr.right
                }
            }
        }
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
    func kthSmallest(_ root: TreeNode?, _ k: Int) -> Int {
        var curr = root
        var k = k

        while curr != nil {
            if curr?.left == nil {
                k -= 1
                if k == 0 {
                    return curr!.val
                }
                curr = curr?.right
            } else {
                var pred = curr?.left
                while pred?.right != nil && pred?.right !== curr {
                    pred = pred?.right
                }

                if pred?.right == nil {
                    pred?.right = curr
                    curr = curr?.left
                } else {
                    pred?.right = nil
                    k -= 1
                    if k == 0 {
                        return curr!.val
                    }
                    curr = curr?.right
                }
            }
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
