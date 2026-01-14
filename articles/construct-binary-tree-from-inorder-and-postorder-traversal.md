## 1. Depth First Search

### Intuition
The last element of postorder is always the root. Once we identify the root, we find it in the inorder array. Everything to the left of the root in inorder belongs to the left subtree, and everything to the right belongs to the right subtree. We recursively apply this logic, slicing the arrays accordingly.

### Algorithm
1. If `postorder` or `inorder` is empty, return `null`.
2. Create the root node using the last element of `postorder`.
3. Find the index `mid` of the root value in `inorder`.
4. Recursively build the left subtree using `inorder[0:mid]` and `postorder[0:mid]`.
5. Recursively build the right subtree using `inorder[mid+1:]` and `postorder[mid:-1]`.
6. Return the root node.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def buildTree(self, inorder: List[int], postorder: List[int]) -> Optional[TreeNode]:
        if not postorder or not inorder:
            return None

        root = TreeNode(postorder[-1])
        mid = inorder.index(postorder[-1])
        root.left = self.buildTree(inorder[:mid], postorder[:mid])
        root.right = self.buildTree(inorder[mid + 1:], postorder[mid:-1])
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
    public TreeNode buildTree(int[] inorder, int[] postorder) {
        if (postorder.length == 0 || inorder.length == 0) {
            return null;
        }

        TreeNode root = new TreeNode(postorder[postorder.length - 1]);
        int mid = 0;
        for (int i = 0; i < inorder.length; i++) {
            if (inorder[i] == postorder[postorder.length - 1]) {
                mid = i;
                break;
            }
        }

        root.left = buildTree(
            Arrays.copyOfRange(inorder, 0, mid),
            Arrays.copyOfRange(postorder, 0, mid)
        );
        root.right = buildTree(
            Arrays.copyOfRange(inorder, mid + 1, inorder.length),
            Arrays.copyOfRange(postorder, mid, postorder.length - 1)
        );

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
    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        if (postorder.empty() || inorder.empty()) {
            return nullptr;
        }

        TreeNode* root = new TreeNode(postorder.back());
        auto it = find(inorder.begin(), inorder.end(), postorder.back());
        int mid = distance(inorder.begin(), it);

        vector<int> leftInorder(inorder.begin(), inorder.begin() + mid);
        vector<int> rightInorder(inorder.begin() + mid + 1, inorder.end());
        vector<int> leftPostorder(postorder.begin(), postorder.begin() + mid);
        vector<int> rightPostorder(postorder.begin() + mid, postorder.end() - 1);

        root->left = buildTree(leftInorder, leftPostorder);
        root->right = buildTree(rightInorder, rightPostorder);

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
     * @param {number[]} inorder
     * @param {number[]} postorder
     * @return {TreeNode}
     */
    buildTree(inorder, postorder) {
        if (postorder.length === 0 || inorder.length === 0) {
            return null;
        }

        const rootVal = postorder[postorder.length - 1];
        const root = new TreeNode(rootVal);
        const mid = inorder.indexOf(rootVal);

        root.left = this.buildTree(
            inorder.slice(0, mid),
            postorder.slice(0, mid),
        );
        root.right = this.buildTree(
            inorder.slice(mid + 1),
            postorder.slice(mid, postorder.length - 1),
        );

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
    public TreeNode BuildTree(int[] inorder, int[] postorder) {
        if (postorder.Length == 0 || inorder.Length == 0) {
            return null;
        }

        int rootVal = postorder[postorder.Length - 1];
        TreeNode root = new TreeNode(rootVal);

        int mid = Array.IndexOf(inorder, rootVal);

        int[] leftInorder = inorder[..mid];
        int[] rightInorder = inorder[(mid + 1)..];

        int[] leftPostorder = postorder[..mid];
        int[] rightPostorder = postorder[mid..^1];

        root.left = BuildTree(leftInorder, leftPostorder);
        root.right = BuildTree(rightInorder, rightPostorder);

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
func buildTree(inorder []int, postorder []int) *TreeNode {
    if len(postorder) == 0 || len(inorder) == 0 {
        return nil
    }

    rootVal := postorder[len(postorder)-1]
    root := &TreeNode{Val: rootVal}

    mid := 0
    for i, v := range inorder {
        if v == rootVal {
            mid = i
            break
        }
    }

    root.Left = buildTree(inorder[:mid], postorder[:mid])
    root.Right = buildTree(inorder[mid+1:], postorder[mid:len(postorder)-1])

    return root
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
    fun buildTree(inorder: IntArray, postorder: IntArray): TreeNode? {
        if (postorder.isEmpty() || inorder.isEmpty()) {
            return null
        }

        val rootVal = postorder.last()
        val root = TreeNode(rootVal)
        val mid = inorder.indexOf(rootVal)

        root.left = buildTree(
            inorder.sliceArray(0 until mid),
            postorder.sliceArray(0 until mid)
        )
        root.right = buildTree(
            inorder.sliceArray(mid + 1 until inorder.size),
            postorder.sliceArray(mid until postorder.size - 1)
        )

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
    func buildTree(_ inorder: [Int], _ postorder: [Int]) -> TreeNode? {
        if postorder.isEmpty || inorder.isEmpty {
            return nil
        }

        let rootVal = postorder.last!
        let root = TreeNode(rootVal)
        let mid = inorder.firstIndex(of: rootVal)!

        root.left = buildTree(
            Array(inorder[0..<mid]),
            Array(postorder[0..<mid])
        )
        root.right = buildTree(
            Array(inorder[(mid + 1)...]),
            Array(postorder[mid..<(postorder.count - 1)])
        )

        return root
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Hash Map + Depth First Search

### Intuition
The previous approach has O(n) lookup time when finding the root in `inorder`. By precomputing a hash map that stores each value's index in `inorder`, we achieve O(1) lookups. We also avoid creating new arrays by using index boundaries instead.

### Algorithm
1. Build a hash map mapping each value in `inorder` to its index.
2. Maintain a pointer `postIdx` starting at the end of `postorder`.
3. Define `dfs(l, r)` that builds the tree for the `inorder` range `[l, r]`:
   - If `l > r`, return `null`.
   - Pop the current root from `postorder` (decrement `postIdx`), create a node.
   - Find the root's index in `inorder` using the hash map.
   - Build the right subtree first (since we're processing `postorder` from the end), then the left subtree.
4. Return the result of `dfs(0, n-1)`.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def buildTree(self, inorder: List[int], postorder: List[int]) -> Optional[TreeNode]:
        inorderIdx = {v: i for i, v in enumerate(inorder)}

        def dfs(l, r):
            if l > r:
                return None

            root = TreeNode(postorder.pop())
            idx = inorderIdx[root.val]
            root.right = dfs(idx + 1, r)
            root.left = dfs(l, idx - 1)
            return root

        return dfs(0, len(inorder) - 1)
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
    private HashMap<Integer, Integer> inorderIdx;
    private int postIdx;

    public TreeNode buildTree(int[] inorder, int[] postorder) {
        inorderIdx = new HashMap<>();
        for (int i = 0; i < inorder.length; i++) {
            inorderIdx.put(inorder[i], i);
        }
        postIdx = postorder.length - 1;

        return dfs(0, inorder.length - 1, postorder);
    }

    private TreeNode dfs(int l, int r, int[] postorder) {
        if (l > r) {
            return null;
        }

        TreeNode root = new TreeNode(postorder[postIdx--]);
        int idx = inorderIdx.get(root.val);
        root.right = dfs(idx + 1, r, postorder);
        root.left = dfs(l, idx - 1, postorder);
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
    unordered_map<int, int> inorderIdx;
    int postIdx;

    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        for (int i = 0; i < inorder.size(); i++) {
            inorderIdx[inorder[i]] = i;
        }
        postIdx = postorder.size() - 1;

        return dfs(0, inorder.size() - 1, postorder);
    }

private:
    TreeNode* dfs(int l, int r, vector<int>& postorder) {
        if (l > r) {
            return nullptr;
        }

        TreeNode* root = new TreeNode(postorder[postIdx--]);
        int idx = inorderIdx[root->val];
        root->right = dfs(idx + 1, r, postorder);
        root->left = dfs(l, idx - 1, postorder);
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
     * @param {number[]} inorder
     * @param {number[]} postorder
     * @return {TreeNode}
     */
    buildTree(inorder, postorder) {
        const inorderIdx = new Map();
        inorder.forEach((val, idx) => inorderIdx.set(val, idx));
        let postIdx = postorder.length - 1;

        const dfs = (l, r) => {
            if (l > r) return null;

            const root = new TreeNode(postorder[postIdx--]);
            const idx = inorderIdx.get(root.val);
            root.right = dfs(idx + 1, r);
            root.left = dfs(l, idx - 1);
            return root;
        };

        return dfs(0, inorder.length - 1);
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
    int[] postorder;
    Dictionary<int, int> inorderIdx;
    int idx;

    public TreeNode BuildTree(int[] inorder, int[] postorder) {
        this.postorder = postorder;
        inorderIdx = new Dictionary<int, int>();
        for (int i = 0; i < inorder.Length; i++) {
            inorderIdx[inorder[i]] = i;
        }
        idx = postorder.Length - 1;
        return Dfs(0, inorder.Length - 1);
    }

    private TreeNode Dfs(int l, int r) {
        if (l > r) return null;

        TreeNode root = new TreeNode(postorder[idx--]);
        int i = inorderIdx[root.val];
        root.right = Dfs(i + 1, r);
        root.left = Dfs(l, i - 1);
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
func buildTree(inorder []int, postorder []int) *TreeNode {
    inorderIdx := make(map[int]int)
    for i, v := range inorder {
        inorderIdx[v] = i
    }
    postIdx := len(postorder) - 1

    var dfs func(l, r int) *TreeNode
    dfs = func(l, r int) *TreeNode {
        if l > r {
            return nil
        }

        root := &TreeNode{Val: postorder[postIdx]}
        postIdx--
        idx := inorderIdx[root.Val]
        root.Right = dfs(idx+1, r)
        root.Left = dfs(l, idx-1)
        return root
    }

    return dfs(0, len(inorder)-1)
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
    private lateinit var inorderIdx: Map<Int, Int>
    private var postIdx = 0
    private lateinit var postorder: IntArray

    fun buildTree(inorder: IntArray, postorder: IntArray): TreeNode? {
        this.postorder = postorder
        inorderIdx = inorder.withIndex().associate { it.value to it.index }
        postIdx = postorder.size - 1
        return dfs(0, inorder.size - 1)
    }

    private fun dfs(l: Int, r: Int): TreeNode? {
        if (l > r) return null

        val root = TreeNode(postorder[postIdx--])
        val idx = inorderIdx[root.`val`]!!
        root.right = dfs(idx + 1, r)
        root.left = dfs(l, idx - 1)
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
    private var inorderIdx: [Int: Int] = [:]
    private var postIdx = 0
    private var postorder: [Int] = []

    func buildTree(_ inorder: [Int], _ postorder: [Int]) -> TreeNode? {
        self.postorder = postorder
        for (i, v) in inorder.enumerated() {
            inorderIdx[v] = i
        }
        postIdx = postorder.count - 1
        return dfs(0, inorder.count - 1)
    }

    private func dfs(_ l: Int, _ r: Int) -> TreeNode? {
        if l > r { return nil }

        let root = TreeNode(postorder[postIdx])
        postIdx -= 1
        let idx = inorderIdx[root.val]!
        root.right = dfs(idx + 1, r)
        root.left = dfs(l, idx - 1)
        return root
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Depth First Search (Optimal)

### Intuition
We can eliminate the hash map by using a boundary-based approach. Instead of explicitly finding the root's position, we pass a "limit" value that tells us when to stop building the current subtree. When we encounter the limit in `inorder`, we know the current subtree is complete. This approach processes both arrays from right to left.

### Algorithm
1. Initialize pointers `postIdx` and `inIdx` both at the last index.
2. Define `dfs(limit)` that builds the subtree bounded by `limit`:
   - If `postIdx < 0`, return `null`.
   - If `inorder[inIdx]` equals `limit`, decrement `inIdx` and return `null` (subtree boundary reached).
   - Create a node with `postorder[postIdx]`, decrement `postIdx`.
   - Build the right subtree with limit set to the current node's value.
   - Build the left subtree with the original limit.
   - Return the node.
3. Call `dfs` with an impossible limit value (like infinity) and return the result.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def buildTree(self, inorder: List[int], postorder: List[int]) -> Optional[TreeNode]:
        postIdx = inIdx = len(postorder) - 1
        def dfs(limit):
            nonlocal postIdx, inIdx
            if postIdx < 0:
                return None
            if inorder[inIdx] == limit:
                inIdx -= 1
                return None

            root = TreeNode(postorder[postIdx])
            postIdx -= 1
            root.right = dfs(root.val)
            root.left = dfs(limit)
            return root
        return dfs(float('inf'))
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
    private int postIdx;
    private int inIdx;

    public TreeNode buildTree(int[] inorder, int[] postorder) {
        postIdx = postorder.length - 1;
        inIdx = inorder.length - 1;

        return dfs(postorder, inorder, Integer.MAX_VALUE);
    }

    private TreeNode dfs(int[] postorder, int[] inorder, int limit) {
        if (postIdx < 0) {
            return null;
        }

        if (inorder[inIdx] == limit) {
            inIdx--;
            return null;
        }

        TreeNode root = new TreeNode(postorder[postIdx--]);
        root.right = dfs(postorder, inorder, root.val);
        root.left = dfs(postorder, inorder, limit);
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
    int postIdx;
    int inIdx;

    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        postIdx = postorder.size() - 1;
        inIdx = inorder.size() - 1;

        return dfs(postorder, inorder, numeric_limits<int>::max());
    }

private:
    TreeNode* dfs(vector<int>& postorder, vector<int>& inorder, int limit) {
        if (postIdx < 0) {
            return nullptr;
        }

        if (inorder[inIdx] == limit) {
            inIdx--;
            return nullptr;
        }

        TreeNode* root = new TreeNode(postorder[postIdx--]);
        root->right = dfs(postorder, inorder, root->val);
        root->left = dfs(postorder, inorder, limit);
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
     * @param {number[]} inorder
     * @param {number[]} postorder
     * @return {TreeNode}
     */
    buildTree(inorder, postorder) {
        let postIdx = postorder.length - 1;
        let inIdx = inorder.length - 1;

        const dfs = (limit) => {
            if (postIdx < 0) return null;

            if (inorder[inIdx] === limit) {
                inIdx--;
                return null;
            }

            const root = new TreeNode(postorder[postIdx--]);
            root.right = dfs(root.val);
            root.left = dfs(limit);
            return root;
        };

        return dfs(Infinity);
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
    int postIdx, inIdx;
    int[] inorder, postorder;

    public TreeNode BuildTree(int[] inorder, int[] postorder) {
        this.inorder = inorder;
        this.postorder = postorder;
        postIdx = inIdx = postorder.Length - 1;
        return Dfs(int.MaxValue);
    }

    private TreeNode Dfs(int limit) {
        if (postIdx < 0) return null;
        if (inorder[inIdx] == limit) {
            inIdx--;
            return null;
        }

        TreeNode root = new TreeNode(postorder[postIdx--]);
        root.right = Dfs(root.val);
        root.left = Dfs(limit);
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
func buildTree(inorder []int, postorder []int) *TreeNode {
    postIdx := len(postorder) - 1
    inIdx := len(inorder) - 1

    var dfs func(limit int) *TreeNode
    dfs = func(limit int) *TreeNode {
        if postIdx < 0 {
            return nil
        }
        if inorder[inIdx] == limit {
            inIdx--
            return nil
        }

        root := &TreeNode{Val: postorder[postIdx]}
        postIdx--
        root.Right = dfs(root.Val)
        root.Left = dfs(limit)
        return root
    }

    return dfs(math.MaxInt32)
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
    private var postIdx = 0
    private var inIdx = 0
    private lateinit var inorder: IntArray
    private lateinit var postorder: IntArray

    fun buildTree(inorder: IntArray, postorder: IntArray): TreeNode? {
        this.inorder = inorder
        this.postorder = postorder
        postIdx = postorder.size - 1
        inIdx = inorder.size - 1
        return dfs(Int.MAX_VALUE)
    }

    private fun dfs(limit: Int): TreeNode? {
        if (postIdx < 0) return null
        if (inorder[inIdx] == limit) {
            inIdx--
            return null
        }

        val root = TreeNode(postorder[postIdx--])
        root.right = dfs(root.`val`)
        root.left = dfs(limit)
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
    private var postIdx = 0
    private var inIdx = 0
    private var inorder: [Int] = []
    private var postorder: [Int] = []

    func buildTree(_ inorder: [Int], _ postorder: [Int]) -> TreeNode? {
        self.inorder = inorder
        self.postorder = postorder
        postIdx = postorder.count - 1
        inIdx = inorder.count - 1
        return dfs(Int.max)
    }

    private func dfs(_ limit: Int) -> TreeNode? {
        if postIdx < 0 { return nil }
        if inorder[inIdx] == limit {
            inIdx -= 1
            return nil
        }

        let root = TreeNode(postorder[postIdx])
        postIdx -= 1
        root.right = dfs(root.val)
        root.left = dfs(limit)
        return root
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## Common Pitfalls

### Building Left Subtree Before Right When Using Postorder Index
When processing postorder from right to left, you must build the right subtree before the left subtree. The postorder array is structured as `[left, right, root]`, so when traversing backwards, we encounter right subtree elements first.
```python
# Wrong: Building left before right
root.left = dfs(l, idx - 1)
root.right = dfs(idx + 1, r)  # postIdx is now wrong

# Correct: Build right first
root.right = dfs(idx + 1, r)
root.left = dfs(l, idx - 1)
```

### Off-by-One Errors in Array Slicing
When slicing arrays for recursive calls, it's easy to miscalculate the postorder boundaries. The left subtree has `mid` elements, so `postorder[:mid]` is correct for the left subtree, and `postorder[mid:-1]` (excluding the root) is correct for the right subtree.
```python
# Wrong: Including the root in right subtree
root.right = self.buildTree(inorder[mid + 1:], postorder[mid:])

# Correct: Exclude the root (last element)
root.right = self.buildTree(inorder[mid + 1:], postorder[mid:-1])
```

### Assuming Preorder Logic Works for Postorder
In preorder traversal, the root is at the beginning of the array, but in postorder, the root is at the end. Using `postorder[0]` instead of `postorder[-1]` as the root will produce an incorrect tree.