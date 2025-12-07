## 1. Top Down Depth-first Search

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the number of nodes in the input tree 

---

## 2. Bottom Up Depth-first Search

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the number of nodes in the input tree
