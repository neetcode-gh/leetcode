## 1. Depth First Search

### Intuition
The first element of the `preorder` array is always the root. We can find this root's position in the `inorder` array, which divides `inorder` into left and right subtrees. Elements before the root in `inorder` belong to the left subtree, and elements after belong to the right subtree. The same split applies to `preorder`. We recursively build left and right subtrees using the corresponding portions of both arrays.

### Algorithm
1. If either array is empty, return `null` (base case).
2. Create a root node with the first element of `preorder`.
3. Find the index of the root value in `inorder` (call it `mid`).
4. Recursively build the left subtree using `preorder[1:mid+1]` and `inorder[0:mid]`.
5. Recursively build the right subtree using `preorder[mid+1:]` and `inorder[mid+1:]`.
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
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        if not preorder or not inorder:
            return None

        root = TreeNode(preorder[0])
        mid = inorder.index(preorder[0])
        root.left = self.buildTree(preorder[1 : mid + 1], inorder[:mid])
        root.right = self.buildTree(preorder[mid + 1 :], inorder[mid + 1 :])
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

class Solution {
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        if (preorder.length == 0 || inorder.length == 0) {
            return null;
        }

        TreeNode root = new TreeNode(preorder[0]);
        int mid = -1;
        for (int i = 0; i < inorder.length; i++) {
            if (inorder[i] == preorder[0]) {
                mid = i;
                break;
            }
        }

        int[] leftPreorder = Arrays.copyOfRange(preorder, 1, mid + 1);
        int[] leftInorder = Arrays.copyOfRange(inorder, 0, mid);
        root.left = buildTree(leftPreorder, leftInorder);

        int[] rightPreorder = Arrays.copyOfRange(preorder, mid + 1, preorder.length);
        int[] rightInorder = Arrays.copyOfRange(inorder, mid + 1, inorder.length);
        root.right = buildTree(rightPreorder, rightInorder);

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
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        if (preorder.empty() || inorder.empty()) {
            return nullptr;
        }

        TreeNode* root = new TreeNode(preorder[0]);
        auto mid = find(inorder.begin(), inorder.end(), preorder[0]) - inorder.begin();
        vector<int> leftPre(preorder.begin() + 1, preorder.begin() + mid + 1);
        vector<int> rightPre(preorder.begin() + mid + 1, preorder.end());
        vector<int> leftIn(inorder.begin(), inorder.begin() + mid);
        vector<int> rightIn(inorder.begin() + mid + 1, inorder.end());
        root->left = buildTree(leftPre, leftIn);
        root->right = buildTree(rightPre, rightIn);
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
     * @param {number[]} preorder
     * @param {number[]} inorder
     * @return {TreeNode}
     */
    buildTree(preorder, inorder) {
        if (!preorder.length || !inorder.length) {
            return null;
        }

        let root = new TreeNode(preorder[0]);
        let mid = inorder.indexOf(preorder[0]);
        root.left = this.buildTree(
            preorder.slice(1, mid + 1),
            inorder.slice(0, mid),
        );
        root.right = this.buildTree(
            preorder.slice(mid + 1),
            inorder.slice(mid + 1),
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
    public TreeNode BuildTree(int[] preorder, int[] inorder) {
        if (preorder.Length == 0 || inorder.Length == 0) {
            return null;
        }

        TreeNode root = new TreeNode(preorder[0]);
        int mid = Array.IndexOf(inorder, preorder[0]);
        root.left = BuildTree(preorder.Skip(1).Take(mid).ToArray(), inorder.Take(mid).ToArray());
        root.right = BuildTree(preorder.Skip(mid + 1).ToArray(), inorder.Skip(mid + 1).ToArray());
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
func buildTree(preorder []int, inorder []int) *TreeNode {
    if len(preorder) == 0 || len(inorder) == 0 {
        return nil
    }

    root := &TreeNode{Val: preorder[0]}

    mid := 0
    for i, val := range inorder {
        if val == preorder[0] {
            mid = i
            break
        }
    }

    root.Left = buildTree(preorder[1:mid+1], inorder[:mid])
    root.Right = buildTree(preorder[mid+1:], inorder[mid+1:])

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
    fun buildTree(preorder: IntArray, inorder: IntArray): TreeNode? {
        if (preorder.isEmpty() || inorder.isEmpty()) {
            return null
        }

        val root = TreeNode(preorder[0])

        val mid = inorder.indexOf(preorder[0])

        root.left = buildTree(
            preorder.slice(1..mid).toIntArray(),
            inorder.slice(0 until mid).toIntArray()
        )

        root.right = buildTree(
            preorder.slice(mid + 1 until preorder.size).toIntArray(),
            inorder.slice(mid + 1 until inorder.size).toIntArray()
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
    func buildTree(_ preorder: [Int], _ inorder: [Int]) -> TreeNode? {
        if preorder.isEmpty || inorder.isEmpty {
            return nil
        }

        let rootValue = preorder[0]
        let root = TreeNode(rootValue)
        guard let mid = inorder.firstIndex(of: rootValue) else {
            return root
        }

        root.left = buildTree(
            Array(preorder[1..<(mid + 1)]),
            Array(inorder[0..<mid])
        )

        root.right = buildTree(
            Array(preorder[(mid + 1)..<preorder.count]),
            Array(inorder[(mid + 1)..<inorder.count])
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
In the basic DFS approach, we search for the root's position in `inorder` using linear search, which takes O(n) time per node. By precomputing a hash map from values to their indices in `inorder`, we can find the root's position in O(1) time. We also avoid creating new arrays by passing indices that define the current subarray boundaries.

### Algorithm
1. Build a hash map mapping each value in `inorder` to its index.
2. Maintain a global preorder index starting at `0`.
3. Define a recursive function `dfs(l, r)` for the `inorder` range `[l, r]`.
4. If `l > r`, return `null` (base case).
5. Get the root value from `preorder` at the current index, increment the index.
6. Look up the root's position in the hash map (call it `mid`).
7. Recursively build left subtree with `dfs(l, mid-1)` and right subtree with `dfs(mid+1, r)`.
8. Return the root node.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        indices = {val: idx for idx, val in enumerate(inorder)}

        self.pre_idx = 0
        def dfs(l, r):
            if l > r:
                return None

            root_val = preorder[self.pre_idx]
            self.pre_idx += 1
            root = TreeNode(root_val)
            mid = indices[root_val]
            root.left = dfs(l, mid - 1)
            root.right = dfs(mid + 1, r)
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
    int pre_idx = 0;
    HashMap<Integer, Integer> indices = new HashMap<>();

    public TreeNode buildTree(int[] preorder, int[] inorder) {
        for (int i = 0; i < inorder.length; i++) {
            indices.put(inorder[i], i);
        }
        return dfs(preorder, 0, inorder.length - 1);
    }

    private TreeNode dfs(int[] preorder, int l, int r) {
        if (l > r) return null;
        int root_val = preorder[pre_idx++];
        TreeNode root = new TreeNode(root_val);
        int mid = indices.get(root_val);
        root.left = dfs(preorder, l, mid - 1);
        root.right = dfs(preorder, mid + 1, r);
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
    int pre_idx = 0;
    unordered_map<int, int> indices;

    TreeNode* dfs(vector<int>& preorder, int l, int r) {
        if (l > r) return nullptr;
        int root_val = preorder[pre_idx++];
        TreeNode* root = new TreeNode(root_val);
        int mid = indices[root_val];
        root->left = dfs(preorder, l, mid - 1);
        root->right = dfs(preorder, mid + 1, r);
        return root;
    }

public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        for (int i = 0; i < inorder.size(); ++i) {
            indices[inorder[i]] = i;
        }
        return dfs(preorder, 0, inorder.size() - 1);
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
     * @param {number[]} preorder
     * @param {number[]} inorder
     * @return {TreeNode}
     */
    buildTree(preorder, inorder) {
        let pre_idx = 0;
        let indices = new Map();

        inorder.forEach((val, i) => indices.set(val, i));

        function dfs(l, r) {
            if (l > r) return null;
            let root_val = preorder[pre_idx++];
            let root = new TreeNode(root_val);
            let mid = indices.get(root_val);
            root.left = dfs(l, mid - 1);
            root.right = dfs(mid + 1, r);
            return root;
        }

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
    int pre_idx = 0;
    Dictionary<int, int> indices = new Dictionary<int, int>();

    public TreeNode BuildTree(int[] preorder, int[] inorder) {
        for (int i = 0; i < inorder.Length; i++) {
            indices[inorder[i]] = i;
        }
        return Dfs(preorder, 0, inorder.Length - 1);
    }

    private TreeNode Dfs(int[] preorder, int l, int r) {
        if (l > r) return null;
        int root_val = preorder[pre_idx++];
        TreeNode root = new TreeNode(root_val);
        int mid = indices[root_val];
        root.left = Dfs(preorder, l, mid - 1);
        root.right = Dfs(preorder, mid + 1, r);
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
func buildTree(preorder []int, inorder []int) *TreeNode {
    indices := make(map[int]int)
    for i, val := range inorder {
        indices[val] = i
    }

    preIdx := 0

    var dfs func(int, int) *TreeNode
    dfs = func(left, right int) *TreeNode {
        if left > right {
            return nil
        }

        rootVal := preorder[preIdx]
        preIdx++

        root := &TreeNode{Val: rootVal}
        mid := indices[rootVal]

        root.Left = dfs(left, mid - 1)
        root.Right = dfs(mid + 1, right)

        return root
    }

    return dfs(0, len(inorder) - 1)
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
    private var preIdx = 0

    fun buildTree(preorder: IntArray, inorder: IntArray): TreeNode? {
        val indices = inorder.withIndex()
            .associate { (index, value) -> value to index }

        fun dfs(left: Int, right: Int): TreeNode? {
            if (left > right) {
                return null
            }

            val rootVal = preorder[preIdx++]
            val root = TreeNode(rootVal)
            val mid = indices[rootVal]!!

            root.left = dfs(left, mid - 1)
            root.right = dfs(mid + 1, right)

            return root
        }

        return dfs(0, inorder.lastIndex)
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
    var preIndex = 0
    var indexMap = [Int: Int]()

    func buildTree(_ preorder: [Int], _ inorder: [Int]) -> TreeNode? {
        for (index, value) in inorder.enumerated() {
            indexMap[value] = index
        }
        return dfs(preorder, 0, inorder.count - 1)
    }

    private func dfs(_ preorder: [Int], _ left: Int, _ right: Int) -> TreeNode? {
        if left > right {
            return nil
        }

        let rootVal = preorder[preIndex]
        preIndex += 1
        let root = TreeNode(rootVal)
        let mid = indexMap[rootVal]!

        root.left = dfs(preorder, left, mid - 1)
        root.right = dfs(preorder, mid + 1, right)

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
We can avoid the hash map entirely by using a limit-based approach. Instead of explicitly finding the root's position, we pass a "limit" value that tells us when to stop building the left subtree. When we encounter the limit value in `inorder`, we know the left subtree is complete. The `preorder` index tells us which node to create next, and the `inorder` index tells us when we have finished a subtree.

### Algorithm
1. Maintain two global indices: `preIdx` for `preorder` and `inIdx` for `inorder`.
2. Define a recursive function `dfs(limit)` that builds a subtree until it hits the limit value.
3. If `preIdx >= n`, return `null` (no more nodes).
4. If `inorder[inIdx] == limit`, increment `inIdx` and return `null` (subtree complete).
5. Create a root node with `preorder[preIdx]`, increment `preIdx`.
6. Build the left subtree with `dfs(root.val)` since nodes less than root appear before it in `inorder`.
7. Build the right subtree with `dfs(limit)` using the original limit.
8. Return the root node. Start with `dfs(infinity)` or a value larger than any node.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        preIdx = inIdx = 0
        def dfs(limit):
            nonlocal preIdx, inIdx
            if preIdx >= len(preorder):
                return None
            if inorder[inIdx] == limit:
                inIdx += 1
                return None

            root = TreeNode(preorder[preIdx])
            preIdx += 1
            root.left = dfs(root.val)
            root.right = dfs(limit)
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
    int preIdx = 0;
    int inIdx = 0;

    public TreeNode buildTree(int[] preorder, int[] inorder) {
        return dfs(preorder, inorder, Integer.MAX_VALUE);
    }

    private TreeNode dfs(int[] preorder, int[] inorder, int limit) {
        if (preIdx >= preorder.length) return null;
        if (inorder[inIdx] == limit) {
            inIdx++;
            return null;
        }

        TreeNode root = new TreeNode(preorder[preIdx++]);
        root.left = dfs(preorder, inorder, root.val);
        root.right = dfs(preorder, inorder, limit);
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
    int preIdx = 0;
    int inIdx = 0;

    TreeNode* dfs(vector<int>& preorder, vector<int>& inorder, int limit) {
        if (preIdx >= preorder.size()) return nullptr;
        if (inorder[inIdx] == limit) {
            inIdx++;
            return nullptr;
        }

        TreeNode* root = new TreeNode(preorder[preIdx++]);
        root->left = dfs(preorder, inorder, root->val);
        root->right = dfs(preorder, inorder, limit);
        return root;
    }

public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        return dfs(preorder, inorder, INT_MAX);
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
     * @param {number[]} preorder
     * @param {number[]} inorder
     * @return {TreeNode}
     */
    buildTree(preorder, inorder) {
        let preIdx = 0,
            inIdx = 0;

        function dfs(limit) {
            if (preIdx >= preorder.length) return null;
            if (inorder[inIdx] === limit) {
                inIdx++;
                return null;
            }

            let root = new TreeNode(preorder[preIdx++]);
            root.left = dfs(root.val);
            root.right = dfs(limit);
            return root;
        }

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
    int preIdx = 0;
    int inIdx = 0;

    public TreeNode BuildTree(int[] preorder, int[] inorder) {
        return Dfs(preorder, inorder, int.MaxValue);
    }

    private TreeNode Dfs(int[] preorder, int[] inorder, int limit) {
        if (preIdx >= preorder.Length) return null;
        if (inorder[inIdx] == limit) {
            inIdx++;
            return null;
        }

        TreeNode root = new TreeNode(preorder[preIdx++]);
        root.left = Dfs(preorder, inorder, root.val);
        root.right = Dfs(preorder, inorder, limit);
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
func buildTree(preorder []int, inorder []int) *TreeNode {
    preIdx, inIdx := 0, 0

    var dfs func(int) *TreeNode
    dfs = func(limit int) *TreeNode {
        if preIdx >= len(preorder) {
            return nil
        }
        if inorder[inIdx] == limit {
            inIdx++
            return nil
        }

        root := &TreeNode{Val: preorder[preIdx]}
        preIdx++

        root.Left = dfs(root.Val)
        root.Right = dfs(limit)

        return root
    }

    return dfs(math.MaxInt)
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
    private var preIdx = 0
    private var inIdx = 0

    fun buildTree(preorder: IntArray, inorder: IntArray): TreeNode? {
        fun dfs(limit: Int): TreeNode? {
            if (preIdx >= preorder.size) {
                return null
            }
            if (inorder[inIdx] == limit) {
                inIdx++
                return null
            }

            val root = TreeNode(preorder[preIdx])
            preIdx++

            root.left = dfs(root.`val`)
            root.right = dfs(limit)

            return root
        }

        return dfs(Int.MAX_VALUE)
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
    var preIdx = 0
    var inIdx = 0

    func buildTree(_ preorder: [Int], _ inorder: [Int]) -> TreeNode? {
        return dfs(preorder, inorder, Int.max)
    }

    private func dfs(_ preorder: [Int], _ inorder: [Int], _ limit: Int) -> TreeNode? {
        if preIdx >= preorder.count {
            return nil
        }
        if inorder[inIdx] == limit {
            inIdx += 1
            return nil
        }

        let root = TreeNode(preorder[preIdx])
        preIdx += 1
        root.left = dfs(preorder, inorder, root.val)
        root.right = dfs(preorder, inorder, limit)
        return root
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 4. Morris Traversal

### Intuition
Morris traversal allows us to build the tree iteratively without using a recursion stack. The idea is to use the right pointers of nodes to temporarily store parent references, simulating the call stack. We build nodes as we iterate through `preorder`, connecting them via left/right pointers. When we finish a left subtree (detected by matching the `inorder` sequence), we restore the original structure by clearing temporary links and moving up the tree.

### Algorithm
1. Create a dummy head node and set `curr` to point to it.
2. Iterate through `preorder` with index `i` and `inorder` with index `j`.
3. Create a new node for `preorder[i]` and attach it as `curr`'s right child, then move `curr` to this new node.
4. While `preorder[i]` does not match `inorder[j]`, keep creating left children (storing parent in right pointer).
5. When a match is found, increment `j`. While `curr.right` exists and matches `inorder[j]`, clear the temporary right link and move up.
6. Continue until all nodes are processed.
7. Return `head.right` as the actual root.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        head = TreeNode(None)
        curr = head
        i, j, n = 0, 0, len(preorder)
        while i < n and j < n:
            # Go right and then as far left as possible
            curr.right = TreeNode(preorder[i], right = curr.right)
            curr = curr.right
            i += 1
            while i < n and curr.val != inorder[j]:
                curr.left = TreeNode(preorder[i], right=curr)
                curr = curr.left
                i += 1
            j += 1
            while curr.right and j < n and curr.right.val == inorder[j]:
                prev = curr.right
                curr.right = None
                curr = prev
                j += 1
        
        return head.right
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
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        TreeNode head = new TreeNode(0);
        TreeNode curr = head;
        int i = 0, j = 0, n = preorder.length;

        while (i < n && j < n) {
            curr.right = new TreeNode(preorder[i], null, curr.right);
            curr = curr.right;
            i++;
            while (i < n && curr.val != inorder[j]) {
                curr.left = new TreeNode(preorder[i], null, curr);
                curr = curr.left;
                i++;
            }
            j++;
            while (curr.right != null && j < n && curr.right.val == inorder[j]) {
                TreeNode prev = curr.right;
                curr.right = null;
                curr = prev;
                j++;
            }
        }
        return head.right;
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
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        TreeNode* head = new TreeNode(0);
        TreeNode* curr = head;
        int i = 0, j = 0, n = preorder.size();

        while (i < n && j < n) {
            curr->right = new TreeNode(preorder[i], nullptr, curr->right);
            curr = curr->right;
            i++;
            while (i < n && curr->val != inorder[j]) {
                curr->left = new TreeNode(preorder[i], nullptr, curr);
                curr = curr->left;
                i++;
            }
            j++;
            while (curr->right && j < n && curr->right->val == inorder[j]) {
                TreeNode* prev = curr->right;
                curr->right = nullptr;
                curr = prev;
                j++;
            }
        }
        return head->right;
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
     * @param {number[]} preorder
     * @param {number[]} inorder
     * @return {TreeNode}
     */
    buildTree(preorder, inorder) {
        let head = new TreeNode(null);
        let curr = head;
        let i = 0, j = 0, n = preorder.length;

        while (i < n && j < n) {
            curr.right = new TreeNode(preorder[i], null, curr.right);
            curr = curr.right;
            i++;
            while (i < n && curr.val !== inorder[j]) {
                curr.left = new TreeNode(preorder[i], null, curr);
                curr = curr.left;
                i++;
            }
            j++;
            while (curr.right && j < n && curr.right.val === inorder[j]) {
                let prev = curr.right;
                curr.right = null;
                curr = prev;
                j++;
            }
        }
        return head.right;
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
    public TreeNode BuildTree(int[] preorder, int[] inorder) {
        TreeNode head = new TreeNode(0);
        TreeNode curr = head;
        int i = 0, j = 0, n = preorder.Length;

        while (i < n && j < n) {
            curr.right = new TreeNode(preorder[i], null, curr.right);
            curr = curr.right;
            i++;
            while (i < n && curr.val != inorder[j]) {
                curr.left = new TreeNode(preorder[i], null, curr);
                curr = curr.left;
                i++;
            }
            j++;
            while (curr.right != null && j < n && curr.right.val == inorder[j]) {
                TreeNode prev = curr.right;
                curr.right = null;
                curr = prev;
                j++;
            }
        }
        return head.right;
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
func buildTree(preorder []int, inorder []int) *TreeNode {
    head := &TreeNode{}
    curr := head
    i, j, n := 0, 0, len(preorder)

    for i < n && j < n {
        curr.Right = &TreeNode{Val: preorder[i], Right: curr.Right}
        curr = curr.Right
        i++
        for i < n && curr.Val != inorder[j] {
            curr.Left = &TreeNode{Val: preorder[i], Right: curr}
            curr = curr.Left
            i++
        }
        j++
        for curr.Right != nil && j < n && curr.Right.Val == inorder[j] {
            prev := curr.Right
            curr.Right = nil
            curr = prev
            j++
        }
    }
    return head.Right
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
    fun buildTree(preorder: IntArray, inorder: IntArray): TreeNode? {
        val head = TreeNode(0)
        var curr: TreeNode? = head
        var i = 0
        var j = 0
        val n = preorder.size

        while (i < n && j < n) {
            curr!!.right = TreeNode(preorder[i], null, curr.right)
            curr = curr.right
            i++
            while (i < n && curr!!.`val` != inorder[j]) {
                curr.left = TreeNode(preorder[i], null, curr)
                curr = curr.left
                i++
            }
            j++
            while (curr!!.right != null && j < n && curr.right!!.`val` == inorder[j]) {
                val prev = curr.right
                curr.right = null
                curr = prev
                j++
            }
        }
        return head.right
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
    func buildTree(_ preorder: [Int], _ inorder: [Int]) -> TreeNode? {
        let head = TreeNode(0)
        var curr: TreeNode? = head
        var i = 0, j = 0
        let n = preorder.count

        while i < n && j < n {
            curr!.right = TreeNode(preorder[i], nil, curr!.right)
            curr = curr!.right
            i += 1

            while i < n && curr!.val != inorder[j] {
                curr!.left = TreeNode(preorder[i], nil, curr)
                curr = curr!.left
                i += 1
            }

            j += 1
            while curr!.right != nil && j < n && curr!.right!.val == inorder[j] {
                let prev = curr!.right
                curr!.right = nil
                curr = prev
                j += 1
            }
        }

        return head.right
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity:
    * $O(1)$ extra space.
    * $O(n)$ for the output tree.