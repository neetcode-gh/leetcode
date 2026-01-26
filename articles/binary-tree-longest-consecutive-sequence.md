## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Binary Tree Structure** - Understanding how nodes connect via left and right children
- **Depth-First Search (DFS)** - Traversing trees using both top-down and bottom-up recursive approaches
- **Passing State Through Recursion** - Carrying information (parent value, sequence length) down or up the tree

---

## 1. Top Down Depth-first Search

### Intuition
We traverse the tree from root to leaves, passing down the current consecutive sequence length to each child. At each node, we check if it continues the sequence from its parent (value is exactly one more than the parent). If so, we extend the sequence; otherwise, we start a new sequence. We track the maximum length seen across all nodes.

### Algorithm
1. Initialize a global variable to track the maximum consecutive sequence length.
2. Define a DFS function that takes the current node, its parent, and the current sequence length.
3. If the current node is `null`, return.
4. If the current node's value equals the parent's value plus `1`, increment the length; otherwise, reset it to `1`.
5. Update the maximum length with the current length.
6. Recursively call DFS on both children, passing the current node as the parent.
7. Return the maximum length found.

::tabs-start

```python
class Solution:
    def longestConsecutive(self, root: Optional[TreeNode]) -> int:
        self.max_length = 0
        self.dfs(root, None, 0)
        return self.max_length
    
    def dfs(self, p: TreeNode, parent: TreeNode, length: int) -> None:
        if p is None:
            return
        
        length = length + 1 if parent is not None and p.val == parent.val + 1 else 1
        self.max_length = max(self.max_length, length)
        
        self.dfs(p.left, p, length)
        self.dfs(p.right, p, length)
```

```java
class Solution {
    private int maxLength = 0;
    
    public int longestConsecutive(TreeNode root) {
        dfs(root, null, 0);
        return maxLength;
    }

    private void dfs(TreeNode p, TreeNode parent, int length) {
        if (p == null) return;
        length = (parent != null && p.val == parent.val + 1) ? length + 1 : 1;
        maxLength = Math.max(maxLength, length);
        dfs(p.left, p, length);
        dfs(p.right, p, length);
    }
}
```

```cpp
class Solution {
private:
    int maxLength = 0;
    
    void dfs(TreeNode* p, TreeNode* parent, int length) {
        if (p == nullptr) return;
        
        length = (parent != nullptr && p->val == parent->val + 1) ? length + 1 : 1;
        maxLength = max(maxLength, length);
        
        dfs(p->left, p, length);
        dfs(p->right, p, length);
    }
    
public:
    int longestConsecutive(TreeNode* root) {
        dfs(root, nullptr, 0);
        return maxLength;
    }
};
```

```javascript
class Solution {
    constructor() {
        this.maxLength = 0;
    }

    /**
     * @param {TreeNode} root
     * @return {number}
     */
    longestConsecutive(root) {
        this.maxLength = 0;
        this.dfs(root, null, 0);
        return this.maxLength;
    }

    /**
     * @param {TreeNode} p
     * @param {TreeNode} parent
     * @param {number} length
     * @return {void}
     */
    dfs(p, parent, length) {
        if (p === null) return;

        length = (parent !== null && p.val === parent.val + 1) ? length + 1 : 1;
        this.maxLength = Math.max(this.maxLength, length);

        this.dfs(p.left, p, length);
        this.dfs(p.right, p, length);
    }
}
```

```csharp
public class Solution {
    private int maxLength = 0;

    public int LongestConsecutive(TreeNode root) {
        Dfs(root, null, 0);
        return maxLength;
    }

    private void Dfs(TreeNode p, TreeNode parent, int length) {
        if (p == null) return;
        length = (parent != null && p.val == parent.val + 1) ? length + 1 : 1;
        maxLength = Math.Max(maxLength, length);
        Dfs(p.left, p, length);
        Dfs(p.right, p, length);
    }
}
```

```go
func longestConsecutive(root *TreeNode) int {
    maxLength := 0

    var dfs func(p, parent *TreeNode, length int)
    dfs = func(p, parent *TreeNode, length int) {
        if p == nil {
            return
        }
        if parent != nil && p.Val == parent.Val+1 {
            length++
        } else {
            length = 1
        }
        if length > maxLength {
            maxLength = length
        }
        dfs(p.Left, p, length)
        dfs(p.Right, p, length)
    }

    dfs(root, nil, 0)
    return maxLength
}
```

```kotlin
class Solution {
    private var maxLength = 0

    fun longestConsecutive(root: TreeNode?): Int {
        maxLength = 0
        dfs(root, null, 0)
        return maxLength
    }

    private fun dfs(p: TreeNode?, parent: TreeNode?, length: Int) {
        if (p == null) return
        var len = if (parent != null && p.`val` == parent.`val` + 1) length + 1 else 1
        maxLength = maxOf(maxLength, len)
        dfs(p.left, p, len)
        dfs(p.right, p, len)
    }
}
```

```swift
class Solution {
    private var maxLength = 0

    func longestConsecutive(_ root: TreeNode?) -> Int {
        maxLength = 0
        dfs(root, nil, 0)
        return maxLength
    }

    private func dfs(_ p: TreeNode?, _ parent: TreeNode?, _ length: Int) {
        guard let p = p else { return }
        var len = 1
        if let parent = parent, p.val == parent.val + 1 {
            len = length + 1
        }
        maxLength = max(maxLength, len)
        dfs(p.left, p, len)
        dfs(p.right, p, len)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the number of nodes in the input tree 

---

## 2. Bottom Up Depth-first Search

### Intuition
Instead of passing information down, we can compute the consecutive sequence length from leaves up to the root. Each node returns the length of the longest consecutive sequence starting from itself going downward. The parent then checks if it can extend this sequence by verifying that its value is exactly one less than its child's value.

### Algorithm
1. Initialize a global variable to track the maximum consecutive sequence length.
2. Define a DFS function that returns the longest consecutive sequence starting from the current node.
3. If the current node is `null`, return `0`.
4. Recursively get the sequence lengths from left and right children, adding `1` for the current node.
5. If the left child exists but doesn't form a consecutive sequence (`current value + 1 != left value`), reset the left length to `1`.
6. Similarly check and potentially reset the right length.
7. Update the maximum length with the larger of the two lengths.
8. Return the larger length to the parent.

::tabs-start

```python
class Solution:
    def longestConsecutive(self, root: Optional[TreeNode]) -> int:
        self.max_length = 0
        self.dfs(root)
        return self.max_length
    
    def dfs(self, p: Optional[TreeNode]) -> int:
        if p is None:
            return 0
        
        L = self.dfs(p.left) + 1
        R = self.dfs(p.right) + 1
        
        if p.left is not None and p.val + 1 != p.left.val:
            L = 1
        
        if p.right is not None and p.val + 1 != p.right.val:
            R = 1
        
        length = max(L, R)
        self.max_length = max(self.max_length, length)
        
        return length
```

```java
public class Solution {
    private int maxLength = 0;
    public int longestConsecutive(TreeNode root) {
        dfs(root);
        return maxLength;
    }

    private int dfs(TreeNode p) {
        if (p == null) return 0;

        int L = dfs(p.left) + 1;
        int R = dfs(p.right) + 1;

        if (p.left != null && p.val + 1 != p.left.val) {
            L = 1;
        }

        if (p.right != null && p.val + 1 != p.right.val) {
            R = 1;
        }

        int length = Math.max(L, R);
        maxLength = Math.max(maxLength, length);

        return length;
    }
}
```

```cpp
class Solution {
private:
    int maxLength = 0;
    
    int dfs(TreeNode* p) {
        if (p == nullptr) return 0;
        
        int L = dfs(p->left) + 1;
        int R = dfs(p->right) + 1;
        
        if (p->left != nullptr && p->val + 1 != p->left->val) {
            L = 1;
        }
        
        if (p->right != nullptr && p->val + 1 != p->right->val) {
            R = 1;
        }
        
        int length = max(L, R);
        maxLength = max(maxLength, length);
        
        return length;
    }
    
public:
    int longestConsecutive(TreeNode* root) {
        dfs(root);
        return maxLength;
    }
};
```

```javascript
class Solution {
    constructor() {
        this.maxLength = 0;
    }

    /**
     * @param {TreeNode} root
     * @return {number}
     */
    longestConsecutive(root) {
        this.maxLength = 0;
        this.dfs(root);
        return this.maxLength;
    }

    /**
     * @param {TreeNode} p
     * @return {number}
     */
    dfs(p) {
        if (p === null) return 0;

        let L = this.dfs(p.left) + 1;
        let R = this.dfs(p.right) + 1;

        if (p.left !== null && p.val + 1 !== p.left.val) {
            L = 1;
        }

        if (p.right !== null && p.val + 1 !== p.right.val) {
            R = 1;
        }

        let length = Math.max(L, R);
        this.maxLength = Math.max(this.maxLength, length);

        return length;
    }
}
```

```csharp
public class Solution {
    private int maxLength = 0;

    public int LongestConsecutive(TreeNode root) {
        Dfs(root);
        return maxLength;
    }

    private int Dfs(TreeNode p) {
        if (p == null) return 0;

        int L = Dfs(p.left) + 1;
        int R = Dfs(p.right) + 1;

        if (p.left != null && p.val + 1 != p.left.val) {
            L = 1;
        }

        if (p.right != null && p.val + 1 != p.right.val) {
            R = 1;
        }

        int length = Math.Max(L, R);
        maxLength = Math.Max(maxLength, length);

        return length;
    }
}
```

```go
func longestConsecutive(root *TreeNode) int {
    maxLength := 0

    var dfs func(p *TreeNode) int
    dfs = func(p *TreeNode) int {
        if p == nil {
            return 0
        }

        L := dfs(p.Left) + 1
        R := dfs(p.Right) + 1

        if p.Left != nil && p.Val+1 != p.Left.Val {
            L = 1
        }

        if p.Right != nil && p.Val+1 != p.Right.Val {
            R = 1
        }

        length := L
        if R > L {
            length = R
        }
        if length > maxLength {
            maxLength = length
        }

        return length
    }

    dfs(root)
    return maxLength
}
```

```kotlin
class Solution {
    private var maxLength = 0

    fun longestConsecutive(root: TreeNode?): Int {
        maxLength = 0
        dfs(root)
        return maxLength
    }

    private fun dfs(p: TreeNode?): Int {
        if (p == null) return 0

        var L = dfs(p.left) + 1
        var R = dfs(p.right) + 1

        if (p.left != null && p.`val` + 1 != p.left!!.`val`) {
            L = 1
        }

        if (p.right != null && p.`val` + 1 != p.right!!.`val`) {
            R = 1
        }

        val length = maxOf(L, R)
        maxLength = maxOf(maxLength, length)

        return length
    }
}
```

```swift
class Solution {
    private var maxLength = 0

    func longestConsecutive(_ root: TreeNode?) -> Int {
        maxLength = 0
        dfs(root)
        return maxLength
    }

    private func dfs(_ p: TreeNode?) -> Int {
        guard let p = p else { return 0 }

        var L = dfs(p.left) + 1
        var R = dfs(p.right) + 1

        if let left = p.left, p.val + 1 != left.val {
            L = 1
        }

        if let right = p.right, p.val + 1 != right.val {
            R = 1
        }

        let length = max(L, R)
        maxLength = max(maxLength, length)

        return length
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the number of nodes in the input tree

---

## Common Pitfalls

### Allowing Decreasing Sequences
The problem asks for strictly increasing consecutive sequences where each child is exactly `parent.val + 1`. A common mistake is checking for any consecutive values (including decreasing) or allowing gaps.
```python
# Wrong: allows decreasing sequences
if abs(p.val - parent.val) == 1:
```

### Not Resetting Length When Sequence Breaks
When the consecutive pattern breaks, the length must reset to 1 (the current node starts a new sequence). Forgetting to reset causes incorrect counts.
```python
# Wrong: continues accumulating instead of resetting
length = length + 1  # should be: length = 1 when pattern breaks
```

### Forgetting to Handle the Root Node
The root node has no parent, so attempting to check `parent.val` without a null check causes errors. The root always starts a new sequence of length 1.
