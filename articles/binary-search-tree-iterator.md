## 1. Flattening the BST (DFS)

### Intuition
The simplest approach is to perform an inorder traversal of the BST upfront and store all values in an array. Since inorder traversal of a BST visits nodes in ascending order, the array will be sorted. Then, `next()` simply returns the next element from the array, and `hasNext()` checks if there are more elements remaining.

### Algorithm
1. In the constructor, perform a recursive inorder DFS traversal of the tree.
2. Store each visited node's value in an array.
3. Maintain an iterator pointer starting at index 0.
4. For `next()`, return the value at the current pointer and increment it.
5. For `hasNext()`, check if the pointer is less than the array length.

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

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
type BSTIterator struct {
    arr []int
    itr int
}

func Constructor(root *TreeNode) BSTIterator {
    it := BSTIterator{arr: []int{}, itr: 0}
    var dfs func(node *TreeNode)
    dfs = func(node *TreeNode) {
        if node == nil {
            return
        }
        dfs(node.Left)
        it.arr = append(it.arr, node.Val)
        dfs(node.Right)
    }
    dfs(root)
    return it
}

func (this *BSTIterator) Next() int {
    val := this.arr[this.itr]
    this.itr++
    return val
}

func (this *BSTIterator) HasNext() bool {
    return this.itr < len(this.arr)
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
class BSTIterator(root: TreeNode?) {
    private val arr = mutableListOf<Int>()
    private var itr = 0

    init {
        fun dfs(node: TreeNode?) {
            if (node == null) return
            dfs(node.left)
            arr.add(node.`val`)
            dfs(node.right)
        }
        dfs(root)
    }

    fun next(): Int {
        return arr[itr++]
    }

    fun hasNext(): Boolean {
        return itr < arr.size
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
class BSTIterator {
    private var arr: [Int] = []
    private var itr: Int = 0

    init(_ root: TreeNode?) {
        func dfs(_ node: TreeNode?) {
            guard let node = node else { return }
            dfs(node.left)
            arr.append(node.val)
            dfs(node.right)
        }
        dfs(root)
    }

    func next() -> Int {
        let val = arr[itr]
        itr += 1
        return val
    }

    func hasNext() -> Bool {
        return itr < arr.count
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

### Intuition
This is the same approach as the recursive version, but implemented iteratively using an explicit stack. We simulate the recursion by pushing nodes onto the stack, going left as far as possible, then processing nodes and going right. The result is the same sorted array of values.

### Algorithm
1. In the constructor, use a stack to perform iterative inorder traversal.
2. Push nodes onto the stack while going left, then pop and add to the array, then go right.
3. Store all values in an array and maintain an iterator pointer.
4. For `next()`, return the value at the current pointer and increment it.
5. For `hasNext()`, check if the pointer is less than the array length.

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

```go
type BSTIterator struct {
    arr []int
    itr int
}

func Constructor(root *TreeNode) BSTIterator {
    it := BSTIterator{arr: []int{}, itr: 0}
    stack := []*TreeNode{}
    for root != nil || len(stack) > 0 {
        for root != nil {
            stack = append(stack, root)
            root = root.Left
        }
        root = stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        it.arr = append(it.arr, root.Val)
        root = root.Right
    }
    return it
}

func (this *BSTIterator) Next() int {
    val := this.arr[this.itr]
    this.itr++
    return val
}

func (this *BSTIterator) HasNext() bool {
    return this.itr < len(this.arr)
}
```

```kotlin
class BSTIterator(root: TreeNode?) {
    private val arr = mutableListOf<Int>()
    private var itr = 0

    init {
        var node = root
        val stack = ArrayDeque<TreeNode>()
        while (node != null || stack.isNotEmpty()) {
            while (node != null) {
                stack.addLast(node)
                node = node.left
            }
            node = stack.removeLast()
            arr.add(node.`val`)
            node = node.right
        }
    }

    fun next(): Int {
        return arr[itr++]
    }

    fun hasNext(): Boolean {
        return itr < arr.size
    }
}
```

```swift
class BSTIterator {
    private var arr: [Int] = []
    private var itr: Int = 0

    init(_ root: TreeNode?) {
        var root = root
        var stack = [TreeNode]()
        while root != nil || !stack.isEmpty {
            while root != nil {
                stack.append(root!)
                root = root!.left
            }
            root = stack.removeLast()
            arr.append(root!.val)
            root = root!.right
        }
    }

    func next() -> Int {
        let val = arr[itr]
        itr += 1
        return val
    }

    func hasNext() -> Bool {
        return itr < arr.count
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

### Intuition
Instead of flattening the entire tree upfront, we can save memory by only keeping track of the path from the root to the current position. We initialize the stack with all nodes along the leftmost path. When `next()` is called, we pop the top node, and if it has a right child, we push all nodes along the leftmost path of the right subtree. This way, the stack always contains the ancestors needed to continue the traversal.

### Algorithm
1. In the constructor, push all nodes from root to the leftmost leaf onto the stack.
2. For `next()`, pop the top node from the stack as the result.
3. If the popped node has a right child, push all nodes from the right child down to its leftmost descendant.
4. Return the popped node's value.
5. For `hasNext()`, return true if the stack is not empty.

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

```go
type BSTIterator struct {
    stack []*TreeNode
}

func Constructor(root *TreeNode) BSTIterator {
    it := BSTIterator{stack: []*TreeNode{}}
    for root != nil {
        it.stack = append(it.stack, root)
        root = root.Left
    }
    return it
}

func (this *BSTIterator) Next() int {
    node := this.stack[len(this.stack)-1]
    this.stack = this.stack[:len(this.stack)-1]
    cur := node.Right
    for cur != nil {
        this.stack = append(this.stack, cur)
        cur = cur.Left
    }
    return node.Val
}

func (this *BSTIterator) HasNext() bool {
    return len(this.stack) > 0
}
```

```kotlin
class BSTIterator(root: TreeNode?) {
    private val stack = ArrayDeque<TreeNode>()

    init {
        var node = root
        while (node != null) {
            stack.addLast(node)
            node = node.left
        }
    }

    fun next(): Int {
        val node = stack.removeLast()
        var cur = node.right
        while (cur != null) {
            stack.addLast(cur)
            cur = cur.left
        }
        return node.`val`
    }

    fun hasNext(): Boolean {
        return stack.isNotEmpty()
    }
}
```

```swift
class BSTIterator {
    private var stack: [TreeNode] = []

    init(_ root: TreeNode?) {
        var root = root
        while root != nil {
            stack.append(root!)
            root = root!.left
        }
    }

    func next() -> Int {
        let node = stack.removeLast()
        var cur = node.right
        while cur != nil {
            stack.append(cur!)
            cur = cur!.left
        }
        return node.val
    }

    func hasNext() -> Bool {
        return !stack.isEmpty
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

### Intuition
This is a slight variation of the previous approach. Instead of initializing the stack in the constructor, we defer the leftward traversal to the `next()` method. We keep a pointer to the current node and only push nodes onto the stack when `next()` is called. This makes the constructor O(1) but the logic is essentially the same.

### Algorithm
1. In the constructor, store the root as the current node and initialize an empty stack.
2. For `next()`, push all nodes from the current node down to its leftmost descendant onto the stack.
3. Pop the top node from the stack, set the current node to its right child.
4. Return the popped node's value.
5. For `hasNext()`, return true if either the current node is not null or the stack is not empty.

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

```go
type BSTIterator struct {
    cur   *TreeNode
    stack []*TreeNode
}

func Constructor(root *TreeNode) BSTIterator {
    return BSTIterator{cur: root, stack: []*TreeNode{}}
}

func (this *BSTIterator) Next() int {
    for this.cur != nil {
        this.stack = append(this.stack, this.cur)
        this.cur = this.cur.Left
    }
    node := this.stack[len(this.stack)-1]
    this.stack = this.stack[:len(this.stack)-1]
    this.cur = node.Right
    return node.Val
}

func (this *BSTIterator) HasNext() bool {
    return this.cur != nil || len(this.stack) > 0
}
```

```kotlin
class BSTIterator(root: TreeNode?) {
    private var cur: TreeNode? = root
    private val stack = ArrayDeque<TreeNode>()

    fun next(): Int {
        while (cur != null) {
            stack.addLast(cur!!)
            cur = cur!!.left
        }
        val node = stack.removeLast()
        cur = node.right
        return node.`val`
    }

    fun hasNext(): Boolean {
        return cur != null || stack.isNotEmpty()
    }
}
```

```swift
class BSTIterator {
    private var cur: TreeNode?
    private var stack: [TreeNode] = []

    init(_ root: TreeNode?) {
        cur = root
    }

    func next() -> Int {
        while cur != nil {
            stack.append(cur!)
            cur = cur!.left
        }
        let node = stack.removeLast()
        cur = node.right
        return node.val
    }

    func hasNext() -> Bool {
        return cur != nil || !stack.isEmpty
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$ in average for each function call.
- Space complexity: $O(h)$

> Where $n$ is the number of nodes and $h$ is the height of the given tree.
