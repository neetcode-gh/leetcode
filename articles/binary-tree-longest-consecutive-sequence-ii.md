## 1. Brute Force (Time Limit Exceeded)

### Intuition
The brute force approach considers every possible path in the tree and checks if it forms a consecutive sequence. For each node, we explore all paths passing through it by examining every possible starting and ending point in its subtrees.

### Algorithm
1. For each node in the tree, consider it as part of a potential consecutive path.
2. Explore all possible paths that include this node by checking combinations of nodes from left and right subtrees.
3. For each path, verify if the values form a consecutive sequence (either increasing or decreasing by 1).
4. Track the maximum length found across all valid consecutive paths.

### Time & Space Complexity

- Time complexity: $O(n^3)$
- Space complexity: $O(n^3)$

>  Where $n$ is the number of nodes in the input tree 

---

## 2. Single traversal

### Intuition
We can find the longest consecutive path in a single traversal by tracking two values at each node: the length of the longest increasing path going down and the length of the longest decreasing path going down. A node can potentially be the turning point where an increasing path from one subtree meets a decreasing path from the other, forming a complete consecutive sequence. By combining these two lengths at each node, we find the longest path passing through that node.

### Algorithm
1. Initialize a global variable to store the maximum path length.
2. Define a DFS function that returns a pair: `[increasing length, decreasing length]` starting from the current node.
3. If the current node is `null`, return `[0, 0]`.
4. Start with increasing and decreasing lengths of `1` (just the current node).
5. For the left child, if it exists and forms a consecutive sequence (value differs by `1`), extend the appropriate length.
6. For the right child, do the same, taking the maximum with any length from the left.
7. Update the global maximum with `(increasing + decreasing - 1)`, since the current node is counted twice.
8. Return `[increasing, decreasing]` for the parent to use.

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

```csharp
public class Solution {
    private int maxval = 0;

    public int LongestConsecutive(TreeNode root) {
        LongestPath(root);
        return maxval;
    }

    private int[] LongestPath(TreeNode root) {
        if (root == null) {
            return new int[] {0, 0};
        }

        int inr = 1, dcr = 1;

        if (root.left != null) {
            int[] left = LongestPath(root.left);
            if (root.val == root.left.val + 1) {
                dcr = left[1] + 1;
            } else if (root.val == root.left.val - 1) {
                inr = left[0] + 1;
            }
        }

        if (root.right != null) {
            int[] right = LongestPath(root.right);
            if (root.val == root.right.val + 1) {
                dcr = Math.Max(dcr, right[1] + 1);
            } else if (root.val == root.right.val - 1) {
                inr = Math.Max(inr, right[0] + 1);
            }
        }

        maxval = Math.Max(maxval, dcr + inr - 1);
        return new int[] {inr, dcr};
    }
}
```

```go
func longestConsecutive(root *TreeNode) int {
    maxval := 0

    var longestPath func(root *TreeNode) []int
    longestPath = func(root *TreeNode) []int {
        if root == nil {
            return []int{0, 0}
        }

        inr, dcr := 1, 1

        if root.Left != nil {
            left := longestPath(root.Left)
            if root.Val == root.Left.Val + 1 {
                dcr = left[1] + 1
            } else if root.Val == root.Left.Val - 1 {
                inr = left[0] + 1
            }
        }

        if root.Right != nil {
            right := longestPath(root.Right)
            if root.Val == root.Right.Val + 1 {
                if right[1] + 1 > dcr {
                    dcr = right[1] + 1
                }
            } else if root.Val == root.Right.Val - 1 {
                if right[0] + 1 > inr {
                    inr = right[0] + 1
                }
            }
        }

        if dcr + inr - 1 > maxval {
            maxval = dcr + inr - 1
        }
        return []int{inr, dcr}
    }

    longestPath(root)
    return maxval
}
```

```kotlin
class Solution {
    private var maxval = 0

    fun longestConsecutive(root: TreeNode?): Int {
        maxval = 0
        longestPath(root)
        return maxval
    }

    private fun longestPath(root: TreeNode?): IntArray {
        if (root == null) {
            return intArrayOf(0, 0)
        }

        var inr = 1
        var dcr = 1

        if (root.left != null) {
            val left = longestPath(root.left)
            if (root.`val` == root.left!!.`val` + 1) {
                dcr = left[1] + 1
            } else if (root.`val` == root.left!!.`val` - 1) {
                inr = left[0] + 1
            }
        }

        if (root.right != null) {
            val right = longestPath(root.right)
            if (root.`val` == root.right!!.`val` + 1) {
                dcr = maxOf(dcr, right[1] + 1)
            } else if (root.`val` == root.right!!.`val` - 1) {
                inr = maxOf(inr, right[0] + 1)
            }
        }

        maxval = maxOf(maxval, dcr + inr - 1)
        return intArrayOf(inr, dcr)
    }
}
```

```swift
class Solution {
    private var maxval = 0

    func longestConsecutive(_ root: TreeNode?) -> Int {
        maxval = 0
        longestPath(root)
        return maxval
    }

    private func longestPath(_ root: TreeNode?) -> [Int] {
        guard let root = root else {
            return [0, 0]
        }

        var inr = 1
        var dcr = 1

        if let left = root.left {
            let leftResult = longestPath(left)
            if root.val == left.val + 1 {
                dcr = leftResult[1] + 1
            } else if root.val == left.val - 1 {
                inr = leftResult[0] + 1
            }
        }

        if let right = root.right {
            let rightResult = longestPath(right)
            if root.val == right.val + 1 {
                dcr = max(dcr, rightResult[1] + 1)
            } else if root.val == right.val - 1 {
                inr = max(inr, rightResult[0] + 1)
            }
        }

        maxval = max(maxval, dcr + inr - 1)
        return [inr, dcr]
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

### Mixing Up Increasing and Decreasing Directions
A node with value `parent.val + 1` extends the increasing path from the child's perspective, but it is tracked as `dcr` (decreasing from root down). The naming can be confusing. Ensure you correctly match which direction each variable tracks.
```python
# If child.val = parent.val - 1, parent extends child's increasing path
# If child.val = parent.val + 1, parent extends child's decreasing path
```

### Forgetting to Subtract 1 When Combining Paths
When combining increasing and decreasing paths through a node, that node is counted in both. The formula is `inr + dcr - 1`, not `inr + dcr`.
```python
# Wrong: maxval = max(maxval, inr + dcr)
# Correct: maxval = max(maxval, dcr + inr - 1)
```

### Only Considering One Child for Each Direction
Both left and right children can contribute to either increasing or decreasing paths. You must take the maximum from both children for each direction, not assume left contributes to one and right to the other.
