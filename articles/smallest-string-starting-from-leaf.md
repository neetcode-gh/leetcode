## 1. Depth First Search

### Intuition

We need to find the lexicographically smallest string that starts at a leaf and ends at the root. Since strings are built from leaf to root, we traverse the tree while building the string by prepending each node's character. When we reach a leaf, we have a complete string to compare. By exploring all paths and keeping track of the minimum string found, we get our answer.

### Algorithm

1. Perform DFS from the root, passing the current string built so far.
2. At each node, prepend the corresponding character (convert node value to 'a' + value) to the current string.
3. If the node has both children, recursively explore both and return the minimum of the two results.
4. If the node has only one child, continue DFS on that child.
5. If the node is a leaf (no children), return the current string.
6. Return the minimum string found across all leaf-to-root paths.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def smallestFromLeaf(self, root: Optional[TreeNode]) -> str:
        def dfs(root, cur):
            if not root:
                return

            cur = chr(ord('a') + root.val) + cur
            if root.left and root.right:
                return min(
                    dfs(root.left, cur),
                    dfs(root.right, cur)
                )

            if root.right:
                return dfs(root.right, cur)
            if root.left:
                return dfs(root.left, cur)
            return cur

        return dfs(root, "")
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
    public String smallestFromLeaf(TreeNode root) {
        return dfs(root, "");
    }

    private String dfs(TreeNode root, String cur) {
        if (root == null) {
            return null;
        }

        cur = (char) ('a' + root.val) + cur;
        if (root.left != null && root.right != null) {
            return min(dfs(root.left, cur), dfs(root.right, cur));
        }

        if (root.right != null) {
            return dfs(root.right, cur);
        }
        if (root.left != null) {
            return dfs(root.left, cur);
        }
        return cur;
    }

    private String min(String a, String b) {
        if (a == null) return b;
        if (b == null) return a;
        return a.compareTo(b) < 0 ? a : b;
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
    string smallestFromLeaf(TreeNode* root) {
        return dfs(root, "");
    }

private:
    string dfs(TreeNode* root, string cur) {
        if (!root) return "";

        cur = char('a' + root->val) + cur;
        if (root->left && root->right) {
            return min(dfs(root->left, cur), dfs(root->right, cur));
        }

        if (root->right) return dfs(root->right, cur);
        if (root->left) return dfs(root->left, cur);
        return cur;
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
    smallestFromLeaf(root) {
        const min = (a, b) => {
            if (!a) return b;
            if (!b) return a;
            return a < b ? a : b;
        };

        const dfs = (node, cur) => {
            if (!node) return;

            cur = String.fromCharCode(97 + node.val) + cur;

            if (node.left && node.right) {
                return min(dfs(node.left, cur), dfs(node.right, cur));
            }
            if (node.left) return dfs(node.left, cur);
            if (node.right) return dfs(node.right, cur);
            return cur;
        };

        return dfs(root, '');
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
    public string SmallestFromLeaf(TreeNode root) {
        return Dfs(root, "");
    }

    private string Dfs(TreeNode root, string cur) {
        if (root == null) return null;

        cur = (char)('a' + root.val) + cur;
        if (root.left != null && root.right != null) {
            return Min(Dfs(root.left, cur), Dfs(root.right, cur));
        }

        if (root.right != null) return Dfs(root.right, cur);
        if (root.left != null) return Dfs(root.left, cur);
        return cur;
    }

    private string Min(string a, string b) {
        if (a == null) return b;
        if (b == null) return a;
        return string.Compare(a, b) < 0 ? a : b;
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
func smallestFromLeaf(root *TreeNode) string {
    return dfs(root, "")
}

func dfs(root *TreeNode, cur string) string {
    if root == nil {
        return ""
    }

    cur = string('a'+rune(root.Val)) + cur
    if root.Left != nil && root.Right != nil {
        left := dfs(root.Left, cur)
        right := dfs(root.Right, cur)
        if left < right {
            return left
        }
        return right
    }

    if root.Right != nil {
        return dfs(root.Right, cur)
    }
    if root.Left != nil {
        return dfs(root.Left, cur)
    }
    return cur
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
    fun smallestFromLeaf(root: TreeNode?): String {
        return dfs(root, "")
    }

    private fun dfs(root: TreeNode?, cur: String): String {
        if (root == null) return ""

        val newCur = ('a' + root.`val`) + cur
        if (root.left != null && root.right != null) {
            val left = dfs(root.left, newCur)
            val right = dfs(root.right, newCur)
            return if (left < right) left else right
        }

        if (root.right != null) return dfs(root.right, newCur)
        if (root.left != null) return dfs(root.left, newCur)
        return newCur
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
    func smallestFromLeaf(_ root: TreeNode?) -> String {
        return dfs(root, "")
    }

    private func dfs(_ root: TreeNode?, _ cur: String) -> String {
        guard let root = root else { return "" }

        let newCur = String(Character(UnicodeScalar(97 + root.val)!)) + cur
        if root.left != nil && root.right != nil {
            let left = dfs(root.left, newCur)
            let right = dfs(root.right, newCur)
            return left < right ? left : right
        }

        if root.right != nil { return dfs(root.right, newCur) }
        if root.left != nil { return dfs(root.left, newCur) }
        return newCur
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 2. Breadth First Search

### Intuition

Instead of recursion, we can use a queue to traverse the tree level by level. Each queue entry stores a node along with the string built from the root down to that node. When we encounter a leaf, we compare its complete string with the current minimum. BFS naturally explores all paths, and we simply track the smallest leaf-to-root string found.

### Algorithm

1. Initialize a queue with the root node and an empty string.
2. While the queue is not empty:
   - Dequeue a node and its associated string.
   - Prepend the current node's character to the string.
   - If the node is a leaf, update the result if this string is smaller.
   - Enqueue left and right children (if they exist) with the updated string.
3. Return the smallest string found.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def smallestFromLeaf(self, root: Optional[TreeNode]) -> str:
        q = deque([(root, "")])
        res = None

        while q:
            node, cur = q.popleft()
            cur = chr(ord('a') + node.val) + cur

            if not node.left and not node.right:
                res = min(res, cur) if res else cur

            if node.left:
                q.append((node.left, cur))
            if node.right:
                q.append((node.right, cur))

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
    public String smallestFromLeaf(TreeNode root) {
        Queue<Pair<TreeNode, String>> q = new LinkedList<>();
        q.offer(new Pair<>(root, ""));
        String res = null;

        while (!q.isEmpty()) {
            Pair<TreeNode, String> pair = q.poll();
            TreeNode node = pair.getKey();
            String cur = (char) ('a' + node.val) + pair.getValue();

            if (node.left == null && node.right == null) {
                if (res == null || cur.compareTo(res) < 0) {
                    res = cur;
                }
            }

            if (node.left != null) q.offer(new Pair<>(node.left, cur));
            if (node.right != null) q.offer(new Pair<>(node.right, cur));
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
    string smallestFromLeaf(TreeNode* root) {
        queue<pair<TreeNode*, string>> q;
        q.push({root, ""});
        string res;

        while (!q.empty()) {
            auto [node, cur] = q.front();
            q.pop();
            cur = char('a' + node->val) + cur;

            if (!node->left && !node->right) {
                if (res.empty() || cur < res) {
                    res = cur;
                }
            }

            if (node->left) q.push({node->left, cur});
            if (node->right) q.push({node->right, cur});
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
     * @return {string}
     */
    smallestFromLeaf(root) {
        const q = new Queue();
        q.push([root, '']);
        let res = null;

        while (!q.isEmpty()) {
            const [node, cur] = q.pop();
            const newCur = String.fromCharCode(97 + node.val) + cur;

            if (!node.left && !node.right) {
                res = res === null || newCur < res ? newCur : res;
            }

            if (node.left) q.push([node.left, newCur]);
            if (node.right) q.push([node.right, newCur]);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 3. Iterative DFS

### Intuition

This approach mirrors the recursive DFS but uses an explicit stack instead of the call stack. We push nodes along with their accumulated strings onto the stack. By processing nodes in LIFO order, we achieve depth-first traversal. The logic for building strings and comparing at leaves remains the same as the recursive version.

### Algorithm

1. Initialize a stack with the root node and an empty string.
2. While the stack is not empty:
   - Pop a node and its associated string.
   - Prepend the current node's character to the string.
   - If the node is a leaf, update the result if this string is smaller.
   - Push right child first, then left child (so left is processed first due to LIFO).
3. Return the smallest string found.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def smallestFromLeaf(self, root: Optional[TreeNode]) -> str:
        stack = [(root, "")]
        res = None

        while stack:
            node, cur = stack.pop()
            cur = chr(ord('a') + node.val) + cur

            if not node.left and not node.right:
                res = min(res, cur) if res else cur

            if node.right:
                stack.append((node.right, cur))
            if node.left:
                stack.append((node.left, cur))

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
    public String smallestFromLeaf(TreeNode root) {
        Stack<Pair<TreeNode, String>> stack = new Stack<>();
        stack.push(new Pair<>(root, ""));
        String res = null;

        while (!stack.isEmpty()) {
            Pair<TreeNode, String> pair = stack.pop();
            TreeNode node = pair.getKey();
            String cur = (char) ('a' + node.val) + pair.getValue();

            if (node.left == null && node.right == null) {
                if (res == null || cur.compareTo(res) < 0) {
                    res = cur;
                }
            }

            if (node.right != null) stack.push(new Pair<>(node.right, cur));
            if (node.left != null) stack.push(new Pair<>(node.left, cur));
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
    string smallestFromLeaf(TreeNode* root) {
        stack<pair<TreeNode*, string>> stk;
        stk.push({root, ""});
        string res;

        while (!stk.empty()) {
            auto [node, cur] = stk.top();stk.pop();
            cur = char('a' + node->val) + cur;

            if (!node->left && !node->right) {
                if (res.empty() || cur < res) {
                    res = cur;
                }
            }

            if (node->right) stk.push({node->right, cur});
            if (node->left) stk.push({node->left, cur});
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
     * @return {string}
     */
    smallestFromLeaf(root) {
        const stack = [[root, '']];
        let res = null;

        while (stack.length) {
            const [node, cur] = stack.pop();
            const newCur = String.fromCharCode(97 + node.val) + cur;

            if (!node.left && !node.right) {
                res = res === null || newCur < res ? newCur : res;
            }

            if (node.right) stack.push([node.right, newCur]);
            if (node.left) stack.push([node.left, newCur]);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$
