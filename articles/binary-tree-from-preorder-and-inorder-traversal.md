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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(n ^ 2)$

---

## 2. Hash Map

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 3. Depth First Search (Optimal)

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
        let preIdx = 0, inIdx = 0;
    
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$