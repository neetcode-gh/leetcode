## 1. Breadth First Search

### **Intuition**

To invert (mirror) a binary tree, every node must swap its **left** and **right** children. Using **Breadth-First Search (BFS)**, we process the tree level-by-level:

- Start from the root.
- For each node, **swap** its children.
- Then push the (new) left and right children into the queue.
- Continue until every node has been processed.

This approach ensures that every node is visited exactly once and inverted immediately when encountered.

---

### **Algorithm**

1. If the tree is empty, return `null`.
2. Initialize a queue and insert the root node.
3. While the queue is not empty:
   - Remove the front node.
   - Swap its `left` and `right` children.
   - If the left child exists, add it to the queue.
   - If the right child exists, add it to the queue.
4. After all nodes are processed, return the root as the inverted tree.

<details>
<summary>Example - Dry Run</summary>

```markdown
Input Tree:
               ┌───┐
               │ 4 │
               └─┬─┘
         ┌───────┴───────┐
       ┌─┴─┐           ┌─┴─┐
       │ 2 │           │ 7 │
       └─┬─┘           └─┬─┘
      ┌──┴──┐         ┌──┴──┐
    ┌─┴─┐ ┌─┴─┐     ┌─┴─┐ ┌─┴─┐
    │ 1 │ │ 3 │     │ 6 │ │ 9 │
    └───┘ └───┘     └───┘ └───┘

Queue: [4]
```


**BFS Traversal (Level by Level):**


═════════════════════════════════════════════════════════════

**Step 1:** Dequeue node 4, swap its children (2 <-> 7)

```markdown
  Swap children of node 4:

      Before:              After:
         4                    4
        / \                  / \
       2   7        →       7   2


  Current state:
               ┌───┐
               │ 4 │
               └─┬─┘
         ┌───────┴───────┐
       ┌─┴─┐           ┌─┴─┐
       │ 7 │           │ 2 │  ← swapped!
       └─┬─┘           └─┬─┘
      ┌──┴──┐         ┌──┴──┐
    ┌─┴─┐ ┌─┴─┐     ┌─┴─┐ ┌─┴─┐
    │ 6 │ │ 9 │     │ 1 │ │ 3 │
    └───┘ └───┘     └───┘ └───┘

  Queue: [7, 2]
```


═════════════════════════════════════════════════════════════

**Step 2:** Dequeue node 7, swap its children (6 <-> 9)

```markdown
  Swap children of node 7:

      Before:              After:
         7                    7
        / \                  / \
       6   9        →       9   6


  Current state:
               ┌───┐
               │ 4 │
               └─┬─┘
         ┌───────┴───────┐
       ┌─┴─┐           ┌─┴─┐
       │ 7 │           │ 2 │
       └─┬─┘           └─┬─┘
      ┌──┴──┐         ┌──┴──┐
    ┌─┴─┐ ┌─┴─┐     ┌─┴─┐ ┌─┴─┐
    │ 9 │ │ 6 │     │ 1 │ │ 3 │  ← swapped 9,6!
    └───┘ └───┘     └───┘ └───┘

  Queue: [2, 9, 6]
```


═════════════════════════════════════════════════════════════

**Step 3:** Dequeue node 2, swap its children (1 <-> 3)

```markdown
  Swap children of node 2:

      Before:              After:
         2                    2
        / \                  / \
       1   3        →       3   1


  Current state:
               ┌───┐
               │ 4 │
               └─┬─┘
         ┌───────┴───────┐
       ┌─┴─┐           ┌─┴─┐
       │ 7 │           │ 2 │
       └─┬─┘           └─┬─┘
      ┌──┴──┐         ┌──┴──┐
    ┌─┴─┐ ┌─┴─┐     ┌─┴─┐ ┌─┴─┐
    │ 9 │ │ 6 │     │ 3 │ │ 1 │  ← swapped 3,1!
    └───┘ └───┘     └───┘ └───┘

  Queue: [9, 6, 3, 1]
```


═════════════════════════════════════════════════════════════

**Steps 4-7:** Dequeue nodes 9, 6, 3, 1

```markdown
  All are leaf nodes (no children to swap)

  Queue: [] (empty)
```


═════════════════════════════════════════════════════════════

**Final Inverted Tree:**

```markdown
               ┌───┐
               │ 4 │
               └─┬─┘
         ┌───────┴───────┐
       ┌─┴─┐           ┌─┴─┐
       │ 7 │           │ 2 │
       └─┬─┘           └─┬─┘
      ┌──┴──┐         ┌──┴──┐
    ┌─┴─┐ ┌─┴─┐     ┌─┴─┐ ┌─┴─┐
    │ 9 │ │ 6 │     │ 3 │ │ 1 │
    └───┘ └───┘     └───┘ └───┘
```

</details>

<br>

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return None
        queue = deque([root])
        while queue:
            node = queue.popleft()
            node.left, node.right = node.right, node.left
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
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

public class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) {
            return null;
        }
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            TreeNode temp = node.left;
            node.left = node.right;
            node.right = temp;
            if (node.left != null) {
                queue.offer(node.left);
            }
            if (node.right != null) {
                queue.offer(node.right);
            }
        }
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
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;
        queue<TreeNode*> queue;
        queue.push(root);
        while (!queue.empty()) {
            TreeNode* node = queue.front();
            queue.pop();
            swap(node->left, node->right);
            if (node->left) queue.push(node->left);
            if (node->right) queue.push(node->right);
        }
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
     * @param {TreeNode} root
     * @return {TreeNode}
     */
    invertTree(root) {
        if (root == null) return null;
        const queue = new Queue([root]);
        while (!queue.isEmpty()) {
            let node = queue.pop();
            [node.left, node.right] = [node.right, node.left];
            if (node.left != null) queue.push(node.left);
            if (node.right != null) queue.push(node.right);
        }
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
    public TreeNode InvertTree(TreeNode root) {
        if (root == null) return null;
        Queue<TreeNode> queue = new Queue<TreeNode>();
        queue.Enqueue(root);
        while (queue.Count > 0) {
            TreeNode node = queue.Dequeue();
            TreeNode temp = node.left;
            node.left = node.right;
            node.right = temp;
            if (node.left != null) queue.Enqueue(node.left);
            if (node.right != null) queue.Enqueue(node.right);
        }
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
func invertTree(root *TreeNode) *TreeNode {
    if root == nil {
        return nil
    }
    queue := arrayqueue.New()
    queue.Enqueue(root)

    for queue.Size() > 0 {
        node, _ := queue.Dequeue()
        current := node.(*TreeNode)
        current.Left, current.Right = current.Right, current.Left

        if current.Left != nil {
            queue.Enqueue(current.Left)
        }
        if current.Right != nil {
            queue.Enqueue(current.Right)
        }
    }
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
    fun invertTree(root: TreeNode?): TreeNode? {
        if (root == null) {
            return null
        }
        val queue: ArrayDeque<TreeNode?> = ArrayDeque()
        queue.add(root)

        while (queue.isNotEmpty()) {
            val node = queue.removeFirst()
            node?.let {
                val temp = it.left
                it.left = it.right
                it.right = temp
                queue.add(it.left)
                queue.add(it.right)
            }
        }
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
    func invertTree(_ root: TreeNode?) -> TreeNode? {
        guard let root = root else { return nil }
        var queue = Deque<TreeNode>()
        queue.append(root)

        while !queue.isEmpty {
            let node = queue.removeFirst()
            (node.left, node.right) = (node.right, node.left)

            if let left = node.left {
                queue.append(left)
            }
            if let right = node.right {
                queue.append(right)
            }
        }
        return root
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Depth First Search

### **Intuition**

Inverting a binary tree means swapping every node’s left and right subtree.  
With **Depth-First Search (DFS)**, we use recursion to invert the tree in a **top-down** manner:

- At each node, **swap** the left and right children.
- Then recursively invert the left subtree.
- Recursively invert the right subtree.

Because every subtree is itself a smaller binary tree, recursion naturally handles this structure.  
The inversion happens during the descent of the recursion, and each subtree becomes correctly mirrored.

---

### **Algorithm**

1. If the current node is `null`, return `null`.
2. Swap the node’s `left` and `right` pointers.
3. Recursively call DFS on the new `left` child.
4. Recursively call DFS on the new `right` child.
5. Return the current node (now inverted).

<details>
<summary>Example - Dry Run</summary>

```markdown
Input Tree:
               ┌───┐
               │ 4 │
               └─┬─┘
         ┌───────┴───────┐
       ┌─┴─┐           ┌─┴─┐
       │ 2 │           │ 7 │
       └─┬─┘           └─┬─┘
      ┌──┴──┐         ┌──┴──┐
    ┌─┴─┐ ┌─┴─┐     ┌─┴─┐ ┌─┴─┐
    │ 1 │ │ 3 │     │ 6 │ │ 9 │
    └───┘ └───┘     └───┘ └───┘
```


**DFS Recursive Traversal (Top-Down):**


═════════════════════════════════════════════════════════════

**Call 1:** `invertTree(4)`

```markdown
  Swap children of node 4:

      Before:              After:
         4                    4
        / \                  / \
       2   7        →       7   2


  Current state:
               ┌───┐
               │ 4 │  ← processing
               └─┬─┘
         ┌───────┴───────┐
       ┌─┴─┐           ┌─┴─┐
       │ 7 │           │ 2 │  ← swapped!
       └─┬─┘           └─┬─┘
      ┌──┴──┐         ┌──┴──┐
    ┌─┴─┐ ┌─┴─┐     ┌─┴─┐ ┌─┴─┐
    │ 6 │ │ 9 │     │ 1 │ │ 3 │
    └───┘ └───┘     └───┘ └───┘

  → Recurse on left child (now 7)
```


═════════════════════════════════════════════════════════════

**Call 2:** `invertTree(7)`

```markdown
  Swap children of node 7:

      Before:              After:
         7                    7
        / \                  / \
       6   9        →       9   6


  Current state:
               ┌───┐
               │ 4 │
               └─┬─┘
         ┌───────┴───────┐
       ┌─┴─┐           ┌─┴─┐
       │ 7 │           │ 2 │
       └─┬─┘           └─┬─┘
      ┌──┴──┐         ┌──┴──┐
    ┌─┴─┐ ┌─┴─┐     ┌─┴─┐ ┌─┴─┐
    │ 9 │ │ 6 │     │ 1 │ │ 3 │  ← swapped 9,6!
    └───┘ └───┘     └───┘ └───┘

  → Recurse on left child (now 9)
```


═════════════════════════════════════════════════════════════

**Call 3:** `invertTree(9)`

```markdown
  Node 9 is a leaf (no children to swap)

    ┌───┐
    │ 9 │  ← leaf node, nothing to swap
    └───┘

  → Return to Call 2
```


═════════════════════════════════════════════════════════════

**Call 4:** `invertTree(6)`

```markdown
  Node 6 is a leaf (no children to swap)

    ┌───┐
    │ 6 │  ← leaf node, nothing to swap
    └───┘

  → Return to Call 2, then return to Call 1
```


═════════════════════════════════════════════════════════════

**Call 5:** `invertTree(2)`

```markdown
  Swap children of node 2:

      Before:              After:
         2                    2
        / \                  / \
       1   3        →       3   1


  Current state:
               ┌───┐
               │ 4 │
               └─┬─┘
         ┌───────┴───────┐
       ┌─┴─┐           ┌─┴─┐
       │ 7 │           │ 2 │  ← processing
       └─┬─┘           └─┬─┘
      ┌──┴──┐         ┌──┴──┐
    ┌─┴─┐ ┌─┴─┐     ┌─┴─┐ ┌─┴─┐
    │ 9 │ │ 6 │     │ 3 │ │ 1 │  ← swapped 3,1!
    └───┘ └───┘     └───┘ └───┘

  → Recurse on left child (now 3)
```


═════════════════════════════════════════════════════════════

**Call 6:** `invertTree(3)`

```markdown
  Node 3 is a leaf (no children to swap)

    ┌───┐
    │ 3 │  ← leaf node, nothing to swap
    └───┘

  → Return to Call 5
```


═════════════════════════════════════════════════════════════

**Call 7:** `invertTree(1)`

```markdown
  Node 1 is a leaf (no children to swap)

    ┌───┐
    │ 1 │  ← leaf node, nothing to swap
    └───┘

  → Return to Call 5, then return to Call 1
```


═════════════════════════════════════════════════════════════

**Final Inverted Tree:**

```markdown
               ┌───┐
               │ 4 │
               └─┬─┘
         ┌───────┴───────┐
       ┌─┴─┐           ┌─┴─┐
       │ 7 │           │ 2 │
       └─┬─┘           └─┬─┘
      ┌──┴──┐         ┌──┴──┐
    ┌─┴─┐ ┌─┴─┐     ┌─┴─┐ ┌─┴─┐
    │ 9 │ │ 6 │     │ 3 │ │ 1 │
    └───┘ └───┘     └───┘ └───┘
```

</details>

<br>

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root: return None

        root.left, root.right = root.right, root.left

        self.invertTree(root.left)
        self.invertTree(root.right)

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

public class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;

        TreeNode temp = root.left;
        root.left = root.right;
        root.right = temp;

        invertTree(root.left);
        invertTree(root.right);

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
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;

        swap(root->left, root->right);
        invertTree(root->left);
        invertTree(root->right);

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
     * @param {TreeNode} root
     * @return {TreeNode}
     */
    invertTree(root) {
        if (!root) return null;

        [root.left, root.right] = [root.right, root.left];
        this.invertTree(root.left);
        this.invertTree(root.right);

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
    public TreeNode InvertTree(TreeNode root) {
        if (root == null) return null;

        TreeNode temp = root.left;
        root.left = root.right;
        root.right = temp;

        InvertTree(root.left);
        InvertTree(root.right);

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

func invertTree(root *TreeNode) *TreeNode {
    if root == nil {
        return nil
    }

    root.Left, root.Right = root.Right, root.Left
    invertTree(root.Left)
    invertTree(root.Right)

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
    fun invertTree(root: TreeNode?): TreeNode? {
        if (root == null) return null

        val temp = root.left
        root.left = root.right
        root.right = temp

        invertTree(root.left)
        invertTree(root.right)

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
    func invertTree(_ root: TreeNode?) -> TreeNode? {
        guard let root = root else { return nil }

        (root.left, root.right) = (root.right, root.left)

        invertTree(root.left)
        invertTree(root.right)

        return root
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 3. Iterative DFS

### **Intuition**

Iterative DFS inverts a binary tree using an explicit stack instead of recursion.  
The idea is the same as recursive DFS:

- Visit a node.
- Swap its left and right children.
- Continue the process for its children.

But instead of the call stack, we use our own **stack data structure**.

The process is:  
1. Push the root into the stack.  
2. Pop the top node, **swap its children**.  
3. Push its children onto the stack (if they exist).  
4. Continue until the stack is empty.

This simulates the recursive DFS in an iterative manner and works well when recursion depth may be too large.

---

### **Algorithm**

1. If `root` is null → return null.
2. Initialize a stack with `root`.
3. While stack is not empty:
   - Pop a node.
   - Swap its `left` and `right` pointers.
   - If the left child exists, push it to the stack.
   - If the right child exists, push it to the stack.
4. Return the `root`.

<details>
<summary>Example - Dry Run</summary>

```markdown
Input Tree:
               ┌───┐
               │ 4 │
               └─┬─┘
         ┌───────┴───────┐
       ┌─┴─┐           ┌─┴─┐
       │ 2 │           │ 7 │
       └─┬─┘           └─┬─┘
      ┌──┴──┐         ┌──┴──┐
    ┌─┴─┐ ┌─┴─┐     ┌─┴─┐ ┌─┴─┐
    │ 1 │ │ 3 │     │ 6 │ │ 9 │
    └───┘ └───┘     └───┘ └───┘

Stack: [4]
```


**Iterative DFS using Stack:**


═════════════════════════════════════════════════════════════

**Step 1:** Pop node 4, swap its children (2 <-> 7)

```markdown
  Swap children of node 4:

      Before:              After:
         4                    4
        / \                  / \
       2   7        →       7   2


  Current state:
               ┌───┐
               │ 4 │
               └─┬─┘
         ┌───────┴───────┐
       ┌─┴─┐           ┌─┴─┐
       │ 7 │           │ 2 │  ← swapped!
       └─┬─┘           └─┬─┘
      ┌──┴──┐         ┌──┴──┐
    ┌─┴─┐ ┌─┴─┐     ┌─┴─┐ ┌─┴─┐
    │ 6 │ │ 9 │     │ 1 │ │ 3 │
    └───┘ └───┘     └───┘ └───┘

  Stack: [7, 2]  (pushed children)
```


═════════════════════════════════════════════════════════════

**Step 2:** Pop node 2, swap its children (1 <-> 3)

```markdown
  Swap children of node 2:

      Before:              After:
         2                    2
        / \                  / \
       1   3        →       3   1


  Current state:
               ┌───┐
               │ 4 │
               └─┬─┘
         ┌───────┴───────┐
       ┌─┴─┐           ┌─┴─┐
       │ 7 │           │ 2 │  ← processing
       └─┬─┘           └─┬─┘
      ┌──┴──┐         ┌──┴──┐
    ┌─┴─┐ ┌─┴─┐     ┌─┴─┐ ┌─┴─┐
    │ 6 │ │ 9 │     │ 3 │ │ 1 │  ← swapped 3,1!
    └───┘ └───┘     └───┘ └───┘

  Stack: [7, 3, 1]  (pushed children)
```


═════════════════════════════════════════════════════════════

**Step 3:** Pop node 1 (leaf node)

```markdown
  Node 1 is a leaf (no children to swap)

    ┌───┐
    │ 1 │  ← leaf node, nothing to swap
    └───┘

  Stack: [7, 3]
```


═════════════════════════════════════════════════════════════

**Step 4:** Pop node 3 (leaf node)

```markdown
  Node 3 is a leaf (no children to swap)

    ┌───┐
    │ 3 │  ← leaf node, nothing to swap
    └───┘

  Stack: [7]
```


═════════════════════════════════════════════════════════════

**Step 5:** Pop node 7, swap its children (6 <-> 9)

```markdown
  Swap children of node 7:

      Before:              After:
         7                    7
        / \                  / \
       6   9        →       9   6


  Current state:
               ┌───┐
               │ 4 │
               └─┬─┘
         ┌───────┴───────┐
       ┌─┴─┐           ┌─┴─┐
       │ 7 │           │ 2 │
       └─┬─┘           └─┬─┘
      ┌──┴──┐         ┌──┴──┐
    ┌─┴─┐ ┌─┴─┐     ┌─┴─┐ ┌─┴─┐
    │ 9 │ │ 6 │     │ 3 │ │ 1 │  ← swapped 9,6!
    └───┘ └───┘     └───┘ └───┘

  Stack: [9, 6]  (pushed children)
```


═════════════════════════════════════════════════════════════

**Step 6:** Pop node 6 (leaf node)

```markdown
  Node 6 is a leaf (no children to swap)

    ┌───┐
    │ 6 │  ← leaf node, nothing to swap
    └───┘

  Stack: [9]
```


═════════════════════════════════════════════════════════════

**Step 7:** Pop node 9 (leaf node)

```markdown
  Node 9 is a leaf (no children to swap)

    ┌───┐
    │ 9 │  ← leaf node, nothing to swap
    └───┘

  Stack: [] (empty)
```


═════════════════════════════════════════════════════════════

**Final Inverted Tree:**

```markdown
               ┌───┐
               │ 4 │
               └─┬─┘
         ┌───────┴───────┐
       ┌─┴─┐           ┌─┴─┐
       │ 7 │           │ 2 │
       └─┬─┘           └─┬─┘
      ┌──┴──┐         ┌──┴──┐
    ┌─┴─┐ ┌─┴─┐     ┌─┴─┐ ┌─┴─┐
    │ 9 │ │ 6 │     │ 3 │ │ 1 │
    └───┘ └───┘     └───┘ └───┘
```

</details>

<br>

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return None
        stack = [root]
        while stack:
            node = stack.pop()
            node.left, node.right = node.right, node.left
            if node.left:
                stack.append(node.left)
            if node.right:
                stack.append(node.right)
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

public class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            TreeNode temp = node.left;
            node.left = node.right;
            node.right = temp;
            if (node.left != null) stack.push(node.left);
            if (node.right != null) stack.push(node.right);
        }
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
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;
        stack<TreeNode*> stack;
        stack.push(root);
        while (!stack.empty()) {
            TreeNode* node = stack.top();
            stack.pop();
            swap(node->left, node->right);
            if (node->left) stack.push(node->left);
            if (node->right) stack.push(node->right);
        }
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
     * @param {TreeNode} root
     * @return {TreeNode}
     */
    invertTree(root) {
        if (!root) return null;
        const stack = [root];
        while (stack.length) {
            const node = stack.pop();
            [node.left, node.right] = [node.right, node.left];
            if (node.left) stack.push(node.left);
            if (node.right) stack.push(node.right);
        }
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
    public TreeNode InvertTree(TreeNode root) {
        if (root == null) return null;
        Stack<TreeNode> stack = new Stack<TreeNode>();
        stack.Push(root);
        while (stack.Count > 0) {
            TreeNode node = stack.Pop();
            TreeNode temp = node.left;
            node.left = node.right;
            node.right = temp;
            if (node.left != null) stack.Push(node.left);
            if (node.right != null) stack.Push(node.right);
        }
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
func invertTree(root *TreeNode) *TreeNode {
    if root == nil {
        return nil
    }

    root.Left, root.Right = root.Right, root.Left

    invertTree(root.Left)
    invertTree(root.Right)

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
    fun invertTree(root: TreeNode?): TreeNode? {
        if (root == null) return null

        root.left = root.right.also { root.right = root.left }

        invertTree(root.left)
        invertTree(root.right)

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
    func invertTree(_ root: TreeNode?) -> TreeNode? {
        guard let root = root else { return nil }
        var stack: [TreeNode] = [root]

        while !stack.isEmpty {
            let node = stack.removeLast()
            (node.left, node.right) = (node.right, node.left)

            if let left = node.left {
                stack.append(left)
            }
            if let right = node.right {
                stack.append(right)
            }
        }
        return root
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
