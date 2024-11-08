## 1. Brute Force

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        if not root:
            return True
        
        left = self.height(root.left)
        right = self.height(root.right)
        if abs(left - right) > 1:
            return False
        return self.isBalanced(root.left) and self.isBalanced(root.right)

    def height(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0

        return 1 + max(self.height(root.left), self.height(root.right))
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
    public boolean isBalanced(TreeNode root) {
        if (root == null) return true;

        int left = height(root.left);
        int right = height(root.right);
        if (Math.abs(left - right) > 1) return false;
        return isBalanced(root.left) && isBalanced(root.right);
    }

    public int height(TreeNode root) {
        if (root == null) {
            return 0;
        }

        return 1 + Math.max(height(root.left), height(root.right));
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
    bool isBalanced(TreeNode* root) {
        if (!root) return true;

        int left = height(root->left);    
        int right = height(root->right);
        if (abs(left - right) > 1) return false;
        return isBalanced(root->left) && isBalanced(root->right);    
    }

    int height(TreeNode* root) {
        if (root == nullptr) {
            return 0;
        }

        return 1 + max(height(root->left), height(root->right));
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
     * @return {boolean}
     */
    isBalanced(root) {
        if (root === null) return true;

        let left = this.height(root.left);
        let right = this.height(root.right);
        if (Math.abs(left - right) > 1) return false;
        return this.isBalanced(root.left) && this.isBalanced(root.right);
    }

    /**
     * @param {TreeNode} root
     * @return {number}
     */
    height(root) {
        if (root === null) {
            return 0;
        }

        return (
            1 + Math.max(this.height(root.left), this.height(root.right))
        );
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
    public bool IsBalanced(TreeNode root) {
        if (root == null) return true;

        int left = Height(root.left);
        int right = Height(root.right);
        if (Math.Abs(left - right) > 1) return false;
        return IsBalanced(root.left) && IsBalanced(root.right);
    }

    public int Height(TreeNode root) {
        if (root == null) {
            return 0;
        }

        return 1 + Math.Max(Height(root.left), Height(root.right));
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
func isBalanced(root *TreeNode) bool {
    if root == nil {
        return true
    }
    
    left := height(root.Left)
    right := height(root.Right)
    if abs(left-right) > 1 {
        return false
    }
    return isBalanced(root.Left) && isBalanced(root.Right)
}

func height(root *TreeNode) int {
    if root == nil {
        return 0
    }
    return 1 + max(height(root.Left), height(root.Right))
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
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
    fun isBalanced(root: TreeNode?): Boolean {
        if (root == null) {
            return true
        }
        
        val left = height(root.left)
        val right = height(root.right)
        if (Math.abs(left - right) > 1) {
            return false
        }
        return isBalanced(root.left) && isBalanced(root.right)
    }
    
    private fun height(root: TreeNode?): Int {
        if (root == null) {
            return 0
        }
        return 1 + maxOf(height(root.left), height(root.right))
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(n)$

---

## 2. Depth First Search

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        def dfs(root):
            if not root:
                return [True, 0]

            left, right = dfs(root.left), dfs(root.right)
            balanced = left[0] and right[0] and abs(left[1] - right[1]) <= 1
            return [balanced, 1 + max(left[1], right[1])]

        return dfs(root)[0]
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
    
    public boolean isBalanced(TreeNode root) {
        return dfs(root)[0] == 1;
    }

    private int[] dfs(TreeNode root) {
        if (root == null) {
            return new int[]{1, 0};
        }

        int[] left = dfs(root.left);
        int[] right = dfs(root.right);

        boolean balanced = (left[0] == 1 && right[0] == 1) && 
                            (Math.abs(left[1] - right[1]) <= 1);
        int height = 1 + Math.max(left[1], right[1]);

        return new int[]{balanced ? 1 : 0, height};
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
    bool isBalanced(TreeNode* root) {
        return dfs(root)[0] == 1;
    }

private:
    vector<int> dfs(TreeNode* root) {
        if (!root) {
            return {1, 0};
        }

        vector<int> left = dfs(root->left);
        vector<int> right = dfs(root->right);

        bool balanced = (left[0] == 1 && right[0] == 1) && 
                        (abs(left[1] - right[1]) <= 1);
        int height = 1 + max(left[1], right[1]);

        return {balanced ? 1 : 0, height};
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
     * @return {boolean}
     */
    isBalanced(root) {
        return this.dfs(root)[0] === 1;
    }

    /**
     * @param {TreeNode} root
     * @return {number[]}
     */
    dfs(root) {
        if (!root) {
            return [1, 0];
        }

        const left = this.dfs(root.left);
        const right = this.dfs(root.right);

        const balanced =
            left[0] === 1 &&
            right[0] === 1 &&
            Math.abs(left[1] - right[1]) <= 1;
        const height = 1 + Math.max(left[1], right[1]);

        return [balanced ? 1 : 0, height];
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
    
    public bool IsBalanced(TreeNode root) {
        return Dfs(root)[0] == 1;
    }

    private int[] Dfs(TreeNode root) {
        if (root == null) {
            return new int[]{1, 0};
        }

        int[] left = Dfs(root.left);
        int[] right = Dfs(root.right);

        bool balanced = (left[0] == 1 && right[0] == 1) &&
                        (Math.Abs(left[1] - right[1]) <= 1);
        int height = 1 + Math.Max(left[1], right[1]);

        return new int[]{balanced ? 1 : 0, height};
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
func isBalanced(root *TreeNode) bool {
    return dfs(root).balanced
}

type Result struct {
    balanced bool
    height   int
}

func dfs(root *TreeNode) Result {
    if root == nil {
        return Result{true, 0}
    }
    
    left := dfs(root.Left)
    right := dfs(root.Right)
    
    balanced := left.balanced && right.balanced && abs(left.height - right.height) <= 1
    return Result{balanced, 1 + max(left.height, right.height)}
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
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
    fun isBalanced(root: TreeNode?): Boolean {
        return dfs(root).first
    }
    
    private fun dfs(root: TreeNode?): Pair<Boolean, Int> {
        if (root == null) {
            return Pair(true, 0)
        }
        
        val left = dfs(root.left)
        val right = dfs(root.right)
        val balanced = left.first && right.first && Math.abs(left.second - right.second) <= 1
        return Pair(balanced, 1 + maxOf(left.second, right.second))
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 3. Depth First Search (Stack)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def isBalanced(self, root):
        stack = []
        node = root
        last = None
        depths = {}

        while stack or node:
            if node:
                stack.append(node)
                node = node.left
            else:
                node = stack[-1]
                if not node.right or last == node.right:
                    stack.pop()
                    left = depths.get(node.left, 0)
                    right = depths.get(node.right, 0)

                    if abs(left - right) > 1:
                        return False

                    depths[node] = 1 + max(left, right)
                    last = node
                    node = None
                else:
                    node = node.right

        return True
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
    public boolean isBalanced(TreeNode root) {
        Stack<TreeNode> stack = new Stack<>();
        TreeNode node = root, last = null;
        Map<TreeNode, Integer> depths = new HashMap<>();
        
        while (!stack.isEmpty() || node != null) {
            if (node != null) {
                stack.push(node);
                node = node.left;
            } else {
                node = stack.peek();
                if (node.right == null || last == node.right) {
                    stack.pop();
                    int left = depths.getOrDefault(node.left, 0);
                    int right = depths.getOrDefault(node.right, 0);
                    if (Math.abs(left - right) > 1) return false;
                    depths.put(node, 1 + Math.max(left, right));
                    last = node;
                    node = null;
                } else {
                    node = node.right;
                }
            }
        }
        return true;
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
    bool isBalanced(TreeNode* root) {
        stack<TreeNode*> stack;
        TreeNode* node = root;
        TreeNode* last = nullptr;
        unordered_map<TreeNode*, int> depths;

        while (!stack.empty() || node != nullptr) {
            if (node != nullptr) {
                stack.push(node);
                node = node->left;
            } else {
                node = stack.top();
                if (node->right == nullptr || last == node->right) {
                    stack.pop();
                    int left = depths[node->left];
                    int right = depths[node->right];
                    if (abs(left - right) > 1) return false;
                    depths[node] = 1 + max(left, right);
                    last = node;
                    node = nullptr;
                } else {
                    node = node->right;
                }
            }
        }
        return true;
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
     * @return {boolean}
     */
    isBalanced(root) {
        let stack = [];
        let node = root, last = null;
        let depths = new Map();

        while (stack.length > 0 || node !== null) {
            if (node !== null) {
                stack.push(node);
                node = node.left;
            } else {
                node = stack[stack.length - 1];
                if (node.right === null || last === node.right) {
                    stack.pop();
                    let left = depths.get(node.left) || 0;
                    let right = depths.get(node.right) || 0;
                    if (Math.abs(left - right) > 1) return false;
                    depths.set(node, 1 + Math.max(left, right));
                    last = node;
                    node = null;
                } else {
                    node = node.right;
                }
            }
        }
        return true;
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
    public bool IsBalanced(TreeNode root) {
        Stack<TreeNode> stack = new Stack<TreeNode>();
        TreeNode node = root, last = null;
        Dictionary<TreeNode, int> depths = new Dictionary<TreeNode, int>();

        while (stack.Count > 0 || node != null) {
            if (node != null) {
                stack.Push(node);
                node = node.left;
            } else {
                node = stack.Peek();
                if (node.right == null || last == node.right) {
                    stack.Pop();
                    
                    int left = (node.left != null && depths.ContainsKey(node.left)) 
                                ? depths[node.left] : 0;
                    int right = (node.right != null && depths.ContainsKey(node.right)) 
                                ? depths[node.right] : 0;

                    if (Math.Abs(left - right) > 1) return false;

                    depths[node] = 1 + Math.Max(left, right);
                    last = node;
                    node = null;
                } else {
                    node = node.right;
                }
            }
        }
        return true;
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
func isBalanced(root *TreeNode) bool {
    stack := []*TreeNode{}
    node := root
    last := (*TreeNode)(nil)
    depths := make(map[*TreeNode]int)

    for len(stack) > 0 || node != nil {
        if node != nil {
            stack = append(stack, node)
            node = node.Left
        } else {
            node = stack[len(stack)-1]
            if node.Right == nil || last == node.Right {
                stack = stack[:len(stack)-1]
                left := depths[node.Left]
                right := depths[node.Right]

                if abs(left-right) > 1 {
                    return false
                }

                depths[node] = 1 + max(left, right)
                last = node
                node = nil
            } else {
                node = node.Right
            }
        }
    }
    return true
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
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
    fun isBalanced(root: TreeNode?): Boolean {
        val stack = mutableListOf<TreeNode?>()
        var node = root
        var last: TreeNode? = null
        val depths = HashMap<TreeNode?, Int>()

        while (stack.isNotEmpty() || node != null) {
            if (node != null) {
                stack.add(node)
                node = node.left
            } else {
                node = stack.last()
                if (node?.right == null || last == node.right) {
                    stack.removeAt(stack.size - 1)
                    val left = depths[node?.left] ?: 0
                    val right = depths[node?.right] ?: 0

                    if (Math.abs(left - right) > 1) {
                        return false
                    }

                    depths[node] = 1 + Math.max(left, right)
                    last = node
                    node = null
                } else {
                    node = node.right
                }
            }
        }
        return true
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$