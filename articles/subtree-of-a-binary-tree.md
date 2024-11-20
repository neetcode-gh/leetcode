## 1. Depth First Search (DFS)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    
    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
        if not subRoot:
            return True
        if not root:
            return False

        if self.sameTree(root, subRoot):
            return True
        return (self.isSubtree(root.left, subRoot) or 
               self.isSubtree(root.right, subRoot))

    def sameTree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
        if not root and not subRoot:
            return True
        if root and subRoot and root.val == subRoot.val:
            return (self.sameTree(root.left, subRoot.left) and 
                   self.sameTree(root.right, subRoot.right))
        return False
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
    
    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        if (subRoot == null) {
            return true;
        }
        if (root == null) {
            return false;
        }

        if (sameTree(root, subRoot)) {
            return true;
        }
        return isSubtree(root.left, subRoot) || 
               isSubtree(root.right, subRoot);
    }

    public boolean sameTree(TreeNode root, TreeNode subRoot) {
        if (root == null && subRoot == null) {
            return true;
        }
        if (root != null && subRoot != null && root.val == subRoot.val) {
            return sameTree(root.left, subRoot.left) && 
                   sameTree(root.right, subRoot.right);
        }
        return false;
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
    bool isSubtree(TreeNode* root, TreeNode* subRoot) {
        if (!subRoot) {
            return true;
        }
        if (!root) {
            return false;
        }

        if (sameTree(root, subRoot)) {
            return true;
        }
        return isSubtree(root->left, subRoot) || 
               isSubtree(root->right, subRoot);
    }

    bool sameTree(TreeNode* root, TreeNode* subRoot) {
        if (!root && !subRoot) {
            return true;
        }
        if (root && subRoot && root->val == subRoot->val) {
            return sameTree(root->left, subRoot->left) &&
                   sameTree(root->right, subRoot->right);
        }
        return false;
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
     * @param {TreeNode} subRoot
     * @return {boolean}
     */
    isSubtree(root, subRoot) {
        if (!subRoot) {
            return true;
        }
        if (!root) {
            return false;
        }

        if (this.sameTree(root, subRoot)) {
            return true;
        }
        return (
            this.isSubtree(root.left, subRoot) ||
            this.isSubtree(root.right, subRoot)
        );
    }

    /**
     * @param {TreeNode} root
     * @param {TreeNode} subRoot
     * @return {boolean}
     */
    sameTree(root, subRoot) {
        if (!root && !subRoot) {
            return true;
        }
        if (root && subRoot && root.val === subRoot.val) {
            return (
                this.sameTree(root.left, subRoot.left) &&
                this.sameTree(root.right, subRoot.right)
            );
        }
        return false;
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
    
    public bool IsSubtree(TreeNode root, TreeNode subRoot) {
        if (subRoot == null) {
            return true;
        }
        if (root == null) {
            return false;
        }

        if (SameTree(root, subRoot)) {
            return true;
        }
        return IsSubtree(root.left, subRoot) || 
               IsSubtree(root.right, subRoot);
    }

    public bool SameTree(TreeNode root, TreeNode subRoot) {
        if (root == null && subRoot == null) {
            return true;
        }
        if (root != null && subRoot != null && root.val == subRoot.val) {
            return SameTree(root.left, subRoot.left) && 
                   SameTree(root.right, subRoot.right);
        }
        return false;
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
func isSubtree(root *TreeNode, subRoot *TreeNode) bool {
    if subRoot == nil {
        return true
    }
    if root == nil {
        return false
    }

    if sameTree(root, subRoot) {
        return true
    }
    return isSubtree(root.Left, subRoot) || isSubtree(root.Right, subRoot)
}

func sameTree(root *TreeNode, subRoot *TreeNode) bool {
    if root == nil && subRoot == nil {
        return true
    }
    if root != nil && subRoot != nil && root.Val == subRoot.Val {
        return sameTree(root.Left, subRoot.Left) && sameTree(root.Right, subRoot.Right)
    }
    return false
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
    fun isSubtree(root: TreeNode?, subRoot: TreeNode?): Boolean {
        if (subRoot == null) {
            return true
        }
        if (root == null) {
            return false
        }

        if (sameTree(root, subRoot)) {
            return true
        }
        return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot)
    }

    fun sameTree(root: TreeNode?, subRoot: TreeNode?): Boolean {
        if (root == null && subRoot == null) {
            return true
        }
        if (root != null && subRoot != null && root.`val` == subRoot.`val`) {
            return sameTree(root.left, subRoot.left) && sameTree(root.right, subRoot.right)
        }
        return false
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m + n)$

> Where $m$ is the number of nodes in $subRoot$ and $n$ is the number of nodes in $root$.

---

## 2. Serialization And Pattern Matching

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution: 
    def serialize(self, root: Optional[TreeNode]) -> str:
            if root == None:
                return "$#"
            
            return ("$" + str(root.val) + 
                    self.serialize(root.left) + self.serialize(root.right))  

    def z_function(self, s: str) -> list:
        z = [0] * len(s)
        l, r, n = 0, 0, len(s)
        for i in range(1, n):
            if i <= r:
                z[i] = min(r - i + 1, z[i - l])
            while i + z[i] < n and s[z[i]] == s[i + z[i]]:
                z[i] += 1
            if i + z[i] - 1 > r:
                l, r = i, i + z[i] - 1
        return z

    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
        serialized_root = self.serialize(root)
        serialized_subRoot = self.serialize(subRoot)
        combined = serialized_subRoot + "|" + serialized_root
        
        z_values = self.z_function(combined)
        sub_len = len(serialized_subRoot)
        
        for i in range(sub_len + 1, len(combined)):
            if z_values[i] == sub_len:
                return True
        return False
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
    public String serialize(TreeNode root) {
        if (root == null) {
            return "$#";
        }
        return "$" + root.val + serialize(root.left) + serialize(root.right);
    }

    public int[] z_function(String s) {
        int[] z = new int[s.length()];
        int l = 0, r = 0, n = s.length();
        for (int i = 1; i < n; i++) {
            if (i <= r) {
                z[i] = Math.min(r - i + 1, z[i - l]);
            }
            while (i + z[i] < n && s.charAt(z[i]) == s.charAt(i + z[i])) {
                z[i]++;
            }
            if (i + z[i] - 1 > r) {
                l = i;
                r = i + z[i] - 1;
            }
        }
        return z;
    }

    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        String serialized_root = serialize(root);
        String serialized_subRoot = serialize(subRoot);
        String combined = serialized_subRoot + "|" + serialized_root;
        
        int[] z_values = z_function(combined);
        int sub_len = serialized_subRoot.length();
        
        for (int i = sub_len + 1; i < combined.length(); i++) {
            if (z_values[i] == sub_len) {
                return true;
            }
        }
        return false;
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
    string serialize(TreeNode* root) {
        if (root == nullptr) {
            return "$#";
        }
        return "$" + to_string(root->val) + 
                serialize(root->left) + serialize(root->right);
    }

    vector<int> z_function(string s) {
        vector<int> z(s.length());
        int l = 0, r = 0, n = s.length();
        for (int i = 1; i < n; i++) {
            if (i <= r) {
                z[i] = min(r - i + 1, z[i - l]);
            }
            while (i + z[i] < n && s[z[i]] == s[i + z[i]]) {
                z[i]++;
            }
            if (i + z[i] - 1 > r) {
                l = i;
                r = i + z[i] - 1;
            }
        }
        return z;
    }

    bool isSubtree(TreeNode* root, TreeNode* subRoot) {
        string serialized_root = serialize(root);
        string serialized_subRoot = serialize(subRoot);
        string combined = serialized_subRoot + "|" + serialized_root;
        
        vector<int> z_values = z_function(combined);
        int sub_len = serialized_subRoot.length();
        
        for (int i = sub_len + 1; i < combined.length(); i++) {
            if (z_values[i] == sub_len) {
                return true;
            }
        }
        return false;
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
    serialize(root) {
        if (root === null) {
            return "$#";
        }
        return "$" + root.val + 
                this.serialize(root.left) + this.serialize(root.right);
    }

    /**
     * @param {string} s
     * @return {number[]}
     */
    z_function(s) {
        const z = new Array(s.length).fill(0);
        let l = 0, r = 0, n = s.length;
        for (let i = 1; i < n; i++) {
            if (i <= r) {
                z[i] = Math.min(r - i + 1, z[i - l]);
            }
            while (i + z[i] < n && s[z[i]] === s[i + z[i]]) {
                z[i]++;
            }
            if (i + z[i] - 1 > r) {
                l = i;
                r = i + z[i] - 1;
            }
        }
        return z;
    }

    /**
     * @param {TreeNode} root
     * @param {TreeNode} subRoot
     * @return {boolean}
     */
    isSubtree(root, subRoot) {
        const serialized_root = this.serialize(root);
        const serialized_subRoot = this.serialize(subRoot);
        const combined = serialized_subRoot + "|" + serialized_root;
        
        const z_values = this.z_function(combined);
        const sub_len = serialized_subRoot.length;
        
        for (let i = sub_len + 1; i < combined.length; i++) {
            if (z_values[i] === sub_len) {
                return true;
            }
        }
        return false;
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
    public string Serialize(TreeNode root) {
        if (root == null) {
            return "$#";
        }
        return "$" + root.val + 
                Serialize(root.left) + Serialize(root.right);
    }

    public int[] ZFunction(string s) {
        int[] z = new int[s.Length];
        int l = 0, r = 0, n = s.Length;
        for (int i = 1; i < n; i++) {
            if (i <= r) {
                z[i] = Math.Min(r - i + 1, z[i - l]);
            }
            while (i + z[i] < n && s[z[i]] == s[i + z[i]]) {
                z[i]++;
            }
            if (i + z[i] - 1 > r) {
                l = i;
                r = i + z[i] - 1;
            }
        }
        return z;
    }

    public bool IsSubtree(TreeNode root, TreeNode subRoot) {
        string serialized_root = Serialize(root);
        string serialized_subRoot = Serialize(subRoot);
        string combined = serialized_subRoot + "|" + serialized_root;
        
        int[] z_values = ZFunction(combined);
        int sub_len = serialized_subRoot.Length;
        
        for (int i = sub_len + 1; i < combined.Length; i++) {
            if (z_values[i] == sub_len) {
                return true;
            }
        }
        return false;
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
func serialize(root *TreeNode) string {
    if root == nil {
        return "$#"
    }
    return "$" + strconv.Itoa(root.Val) + serialize(root.Left) + serialize(root.Right)
}

func zFunction(s string) []int {
    n := len(s)
    z := make([]int, n)
    l, r := 0, 0
    
    for i := 1; i < n; i++ {
        if i <= r {
            z[i] = min(r-i+1, z[i-l])
        }
        for i+z[i] < n && s[z[i]] == s[i+z[i]] {
            z[i]++
        }
        if i+z[i]-1 > r {
            l = i
            r = i + z[i] - 1
        }
    }
    return z
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}

func isSubtree(root *TreeNode, subRoot *TreeNode) bool {
    serializedRoot := serialize(root)
    serializedSubRoot := serialize(subRoot)
    combined := serializedSubRoot + "|" + serializedRoot
    
    zValues := zFunction(combined)
    subLen := len(serializedSubRoot)
    
    for i := subLen + 1; i < len(combined); i++ {
        if zValues[i] == subLen {
            return true
        }
    }
    return false
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
    private fun serialize(root: TreeNode?): String {
        return when (root) {
            null -> "$#"
            else -> "$${root.`val`}${serialize(root.left)}${serialize(root.right)}"
        }
    }
    
    private fun zFunction(s: String): IntArray {
        val n = s.length
        val z = IntArray(n)
        var l = 0
        var r = 0
        
        for (i in 1 until n) {
            if (i <= r) {
                z[i] = minOf(r - i + 1, z[i - l])
            }
            while (i + z[i] < n && s[z[i]] == s[i + z[i]]) {
                z[i]++
            }
            if (i + z[i] - 1 > r) {
                l = i
                r = i + z[i] - 1
            }
        }
        return z
    }
    
    fun isSubtree(root: TreeNode?, subRoot: TreeNode?): Boolean {
        val serializedRoot = serialize(root)
        val serializedSubRoot = serialize(subRoot)
        val combined = serializedSubRoot + "|" + serializedRoot
        
        val zValues = zFunction(combined)
        val subLen = serializedSubRoot.length
        
        return (subLen + 1 until combined.length).any { i -> zValues[i] == subLen }
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m + n)$
* Space complexity: $O(m + n)$

> Where $m$ is the number of nodes in $subRoot$ and $n$ is the number of nodes in $root$.