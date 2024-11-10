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
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        res = []

        def dfs(node, depth):
            if not node:
                return None
            if len(res) == depth:
                res.append([])
            
            res[depth].append(node.val)
            dfs(node.left, depth + 1)
            dfs(node.right, depth + 1)
        
        dfs(root, 0)
        return res
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
    List<List<Integer>> res = new ArrayList<>();
    
    public List<List<Integer>> levelOrder(TreeNode root) {
        dfs(root, 0);
        return res;
    }
    
    private void dfs(TreeNode node, int depth) {
        if (node == null) {
            return;
        }
        
        if (res.size() == depth) {
            res.add(new ArrayList<>());
        }
        
        res.get(depth).add(node.val);
        dfs(node.left, depth + 1);
        dfs(node.right, depth + 1);
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
    vector<vector<int>> res;
    
    vector<vector<int>> levelOrder(TreeNode* root) {
        dfs(root, 0);
        return res;
    }
    
    void dfs(TreeNode* node, int depth) {
        if (!node) return;
        
        if (res.size() == depth) {
            res.push_back(vector<int>());
        }
        
        res[depth].push_back(node->val);
        dfs(node->left, depth + 1);
        dfs(node->right, depth + 1);
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
     * @return {number[][]}
     */
    levelOrder(root) {
        let res = [];
        
        /**
         * @param {TreeNode} node
         * @param {number} depth
         */
        function dfs(node, depth) {
            if (!node) return;

            if (res.length === depth) {
                res.push([]);
            }

            res[depth].push(node.val);
            dfs(node.left, depth + 1);
            dfs(node.right, depth + 1);
        }

        dfs(root, 0);
        return res;
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
    List<List<int>> res = new List<List<int>>();
    
    public List<List<int>> LevelOrder(TreeNode root) {
        dfs(root, 0);
        return res;
    }
    
    private void dfs(TreeNode node, int depth) {
        if (node == null) {
            return;
        }
        
        if (res.Count == depth) {
            res.Add(new List<int>());
        }
        
        res[depth].Add(node.val);
        dfs(node.left, depth + 1);
        dfs(node.right, depth + 1);
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
func levelOrder(root *TreeNode) [][]int {
    res := [][]int{}
    
    var dfs func(node *TreeNode, depth int)
    dfs = func(node *TreeNode, depth int) {
        if node == nil {
            return
        }
        
        if len(res) == depth {
            res = append(res, []int{})
        }
        
        res[depth] = append(res[depth], node.Val)
        dfs(node.Left, depth+1)
        dfs(node.Right, depth+1)
    }
    
    dfs(root, 0)
    return res
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
    fun levelOrder(root: TreeNode?): List<List<Int>> {
        val res = mutableListOf<MutableList<Int>>()
        
        fun dfs(node: TreeNode?, depth: Int) {
            if (node == null) return
            
            if (res.size == depth) {
                res.add(mutableListOf())
            }
            
            res[depth].add(node.`val`)
            dfs(node.left, depth + 1)
            dfs(node.right, depth + 1)
        }
        
        dfs(root, 0)
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 2. Breadth First Search

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        res = []

        q = collections.deque()
        q.append(root)

        while q:
            qLen = len(q)
            level = []
            for i in range(qLen):
                node = q.popleft()
                if node:
                    level.append(node.val)
                    q.append(node.left)
                    q.append(node.right)
            if level:
                res.append(level)
                
        return res
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
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();

        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);

        while (!q.isEmpty()) {
            List<Integer> level = new ArrayList<>();

            for (int i = q.size(); i > 0; i--) {
                TreeNode node = q.poll();
                if (node != null) {
                    level.add(node.val);
                    q.add(node.left);
                    q.add(node.right);
                }
            }
            if (level.size() > 0) {
                res.add(level);
            }
        }
        return res;
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
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> res;
        if (!root) return res;

        queue<TreeNode*> q;
        q.push(root);

        while (!q.empty()) {
            vector<int> level;
            int size = q.size();

            for (int i = q.size(); i > 0; i--) {
                TreeNode* node = q.front();
                q.pop();
                if (node) {
                    level.push_back(node->val);
                    q.push(node->left);
                    q.push(node->right);
                }
            }
            if (!level.empty()) {
                res.push_back(level);
            }
        }
        return res;
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
     * @return {number[][]}
     */
    levelOrder(root) {
        let res = [];
        if (!root) return res;

        const q = new Queue();
        q.push(root);

        while (!q.isEmpty()) {
            let level = [];

            for (let i = q.size(); i > 0; i--) {
                let node = q.pop();
                if (node !== null) {
                    level.push(node.val);
                    q.push(node.left);
                    q.push(node.right);
                }
            }
            if (level.length > 0) {
                res.push(level);
            }
        }
        return res;
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
    public List<List<int>> LevelOrder(TreeNode root) {
        List<List<int>> res = new List<List<int>>();
        if (root == null) return res;

        Queue<TreeNode> q = new Queue<TreeNode>();
        q.Enqueue(root);

        while (q.Count > 0) {
            List<int> level = new List<int>();

            for (int i = q.Count; i > 0; i--) {
                TreeNode node = q.Dequeue();
                if (node != null) {
                    level.Add(node.val);
                    q.Enqueue(node.left);
                    q.Enqueue(node.right);
                }
            }
            if (level.Count > 0) {
                res.Add(level);
            }
        }
        return res;
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
func levelOrder(root *TreeNode) [][]int {
    res := [][]int{}
    if root == nil {
        return res
    }

    q := []*TreeNode{root}

    for len(q) > 0 {
        qLen := len(q)
        level := []int{}

        for i := 0; i < qLen; i++ {
            node := q[0]
            q = q[1:] 
            level = append(level, node.Val)

            if node.Left != nil {
                q = append(q, node.Left)
            }
            if node.Right != nil {
                q = append(q, node.Right)
            }
        }
        
        res = append(res, level)
    }

    return res
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
    fun levelOrder(root: TreeNode?): List<List<Int>> {
        val res = mutableListOf<List<Int>>()
        if (root == null) return res

        val q = ArrayDeque<TreeNode>()
        q.add(root)

        while (q.isNotEmpty()) {
            val level = mutableListOf<Int>()
            val qLen = q.size
            
            for (i in 0 until qLen) {
                val node = q.removeFirst()
                level.add(node.`val`)

                node.left?.let { q.add(it) }
                node.right?.let { q.add(it) }
            }
            
            res.add(level)
        }
        
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$