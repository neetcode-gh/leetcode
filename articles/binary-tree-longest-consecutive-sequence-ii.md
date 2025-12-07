## 1. Brute Force (Time Limit Exceeded)

### Time & Space Complexity

- Time complexity: $O(n^3)$
- Space complexity: $O(n^3)$

>  Where $n$ is the number of nodes in the input tree 

---

## 2. Single traversal

::tabs-start

```python
class Solution:
    def longestConsecutive(self, root: TreeNode) -> int:
                
        def longest_path(root: TreeNode) -> List[int]:
            nonlocal maxval
            
            if not root:
                return [0, 0]
            
            inr = dcr = 1
            if root.left:
                left = longest_path(root.left)
                if (root.val == root.left.val + 1):
                    dcr = left[1] + 1
                elif (root.val == root.left.val - 1):
                    inr = left[0] + 1
            
            if root.right:
                right = longest_path(root.right)
                if (root.val == root.right.val + 1):
                    dcr = max(dcr, right[1] + 1)
                elif (root.val == root.right.val - 1):
                    inr = max(inr, right[0] + 1)
                    
            maxval = max(maxval, dcr + inr - 1)
            return [inr, dcr]
        
        maxval = 0
        longest_path(root)
        return maxval
```

```java
class Solution {
    int maxval = 0;
    
    public int longestConsecutive(TreeNode root) {
        longestPath(root);
        return maxval;
    }
    
    public int[] longestPath(TreeNode root) {
        if (root == null) {
            return new int[] {0,0};
        }
        
        int inr = 1, dcr = 1;
        if (root.left != null) {
            int[] left = longestPath(root.left);
            if (root.val == root.left.val + 1) {
                dcr = left[1] + 1;
            } else if (root.val == root.left.val - 1) {
                inr = left[0] + 1;
            }
        }
        
        if (root.right != null) {
            int[] right = longestPath(root.right);
            if (root.val == root.right.val + 1) {
                dcr = Math.max(dcr, right[1] + 1);
            } else if (root.val == root.right.val - 1) {
                inr = Math.max(inr, right[0] + 1);
            }
        }
        
        maxval = Math.max(maxval, dcr + inr - 1);
        return new int[] {inr, dcr};
    }
}
```

```cpp
class Solution {
private:
    int maxval = 0;
    
    vector<int> longestPath(TreeNode* root) {
        if (root == nullptr) {
            return {0, 0};
        }
        
        int inr = 1, dcr = 1;
        
        if (root->left != nullptr) {
            vector<int> left = longestPath(root->left);
            if (root->val == root->left->val + 1) {
                dcr = left[1] + 1;
            } else if (root->val == root->left->val - 1) {
                inr = left[0] + 1;
            }
        }
        
        if (root->right != nullptr) {
            vector<int> right = longestPath(root->right);
            if (root->val == root->right->val + 1) {
                dcr = max(dcr, right[1] + 1);
            } else if (root->val == root->right->val - 1) {
                inr = max(inr, right[0] + 1);
            }
        }
        
        maxval = max(maxval, dcr + inr - 1);
        
        return {inr, dcr};
    }
    
public:
    int longestConsecutive(TreeNode* root) {
        longestPath(root);
        return maxval;
    }
};
```

```javascript
class Solution {
    constructor() {
        this.maxval = 0;
    }
    
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    longestConsecutive(root) {
        this.maxval = 0;
        this.longestPath(root);
        return this.maxval;
    }
    
    /**
     * @param {TreeNode} root
     * @return {number[]}
     */
    longestPath(root) {
        if (root === null) {
            return [0, 0];
        }
        
        let inr = 1, dcr = 1;
        
        if (root.left !== null) {
            let left = this.longestPath(root.left);
            if (root.val === root.left.val + 1) {
                dcr = left[1] + 1;
            } else if (root.val === root.left.val - 1) {
                inr = left[0] + 1;
            }
        }
        
        if (root.right !== null) {
            let right = this.longestPath(root.right);
            if (root.val === root.right.val + 1) {
                dcr = Math.max(dcr, right[1] + 1);
            } else if (root.val === root.right.val - 1) {
                inr = Math.max(inr, right[0] + 1);
            }
        }
        
        this.maxval = Math.max(this.maxval, dcr + inr - 1);
        
        return [inr, dcr];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the number of nodes in the input tree 
