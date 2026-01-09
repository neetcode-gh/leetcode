## 1. Depth First Search

### Intuition

Postorder traversal means we visit all children of a node before visiting the node itself. For an N-ary tree, this translates to recursively processing each child subtree from left to right, then adding the current node's value to the result. The recursive approach naturally handles this ordering since the node's value is appended only after all recursive calls on its children have completed.

### Algorithm

1. Create an empty `res` list.
2. Define a recursive helper function `dfs(node)`:
   - If the node is `null`, return immediately.
   - For each `child` of the node, recursively call `dfs(child)`.
   - After processing all children, append the node's value to the `res` list.
3. Call `dfs(root)` and return the `res` list.

::tabs-start

```python
"""
# Definition for a Node.
class Node:
    def __init__(self, val: Optional[int] = None, children: Optional[List['Node']] = None):
        self.val = val
        self.children = children
"""

class Solution:
    def postorder(self, root: 'Node') -> List[int]:
        res = []

        def dfs(node):
            if not node:
                return

            for child in node.children:
                dfs(child)
            res.append(node.val)

        dfs(root)
        return res
```

```java
/*
// Definition for a Node.
class Node {
    public int val;
    public List<Node> children;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, List<Node> _children) {
        val = _val;
        children = _children;
    }
}
*/

public class Solution {
    public List<Integer> postorder(Node root) {
        List<Integer> res = new ArrayList<>();

        dfs(root, res);
        return res;
    }

    private void dfs(Node node, List<Integer> res) {
        if (node == null) {
            return;
        }
        for (Node child : node.children) {
            dfs(child, res);
        }
        res.add(node.val);
    }
}
```

```cpp
/*
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> children;

    Node() {}

    Node(int _val) {
        val = _val;
    }

    Node(int _val, vector<Node*> _children) {
        val = _val;
        children = _children;
    }
};
*/

class Solution {
public:
    vector<int> postorder(Node* root) {
        vector<int> res;
        dfs(root, res);
        return res;
    }

    void dfs(Node* node, vector<int>& res) {
        if (!node) return;
        for (auto child : node->children) {
            dfs(child, res);
        }
        res.push_back(node->val);
    }
};
```

```javascript
/**
 * Definition for a binary tree node.
 * class Node {
 *     constructor(val = 0, children = []) {
 *         this.val = val;
 *         this.children = children;
 *     }
 * }
 */
class Solution {
    /**
     * @param {Node|null} root
     * @return {number[]}
     */
    postorder(root) {
        const res = [];

        const dfs = (node) => {
            if (!node) return;
            for (let child of node.children) {
                dfs(child);
            }
            res.push(node.val);
        };

        dfs(root);
        return res;
    }
}
```

```csharp
/*
// Definition for a Node.
public class Node {
    public int val;
    public List<Node> children;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, IList<Node> _children) {
        val = _val;
        children = _children;
    }
}
*/

public class Solution {
    public List<int> Postorder(Node root) {
        List<int> res = new List<int>();
        Dfs(root, res);
        return res;
    }

    private void Dfs(Node node, List<int> res) {
        if (node == null) return;
        foreach (var child in node.children) {
            Dfs(child, res);
        }
        res.Add(node.val);
    }
}
```

```go
/**
 * Definition for a Node.
 * type Node struct {
 *     Val int
 *     Children []*Node
 * }
 */

func postorder(root *Node) []int {
    res := []int{}

    var dfs func(node *Node)
    dfs = func(node *Node) {
        if node == nil {
            return
        }
        for _, child := range node.Children {
            dfs(child)
        }
        res = append(res, node.Val)
    }

    dfs(root)
    return res
}
```

```kotlin
/**
 * Definition for a Node.
 * class Node(var `val`: Int) {
 *     var children: List<Node?> = listOf()
 * }
 */

class Solution {
    fun postorder(root: Node?): List<Int> {
        val res = mutableListOf<Int>()

        fun dfs(node: Node?) {
            if (node == null) return
            for (child in node.children) {
                dfs(child)
            }
            res.add(node.`val`)
        }

        dfs(root)
        return res
    }
}
```

```swift
/**
 * Definition for a Node.
 * public class Node {
 *     public var val: Int
 *     public var children: [Node]
 *     public init(_ val: Int) {
 *         self.val = val
 *         self.children = []
 *     }
 * }
 */

class Solution {
    func postorder(_ root: Node?) -> [Int] {
        var res = [Int]()

        func dfs(_ node: Node?) {
            guard let node = node else { return }
            for child in node.children {
                dfs(child)
            }
            res.append(node.val)
        }

        dfs(root)
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$ for the recursion stack.

---

## 2. Iterative DFS

### Intuition

To convert the recursive solution to an iterative one, we use a stack. The key challenge is ensuring we process a node only after all its children have been processed. We achieve this by pushing each node onto the stack twice: once to signal that its children should be explored, and once to signal that it should be added to the result. A visited flag distinguishes between these two cases. When we pop a node that has been visited, we add it to the result. When we pop an unvisited node, we mark it as visited, push it back, then push all its children in reverse order.

### Algorithm

1. If the root is `null`, return an empty list.
2. Initialize a `stack` with the pair `(root, false)`, where `false` indicates the node has not been `visited`.
3. While the `stack` is not empty:
   - Pop a pair `(node, visited)`.
   - If `visited` is `true`, add `node.val` to the result.
   - Otherwise, push `(node, true)` back onto the `stack`, then push all children in reverse order as `(child, false)`.
4. Return the result list.

::tabs-start

```python
"""
# Definition for a Node.
class Node:
    def __init__(self, val: Optional[int] = None, children: Optional[List['Node']] = None):
        self.val = val
        self.children = children
"""

class Solution:
    def postorder(self, root: 'Node') -> List[int]:
        res = []
        if not root:
            return res
        
        stack = [(root, False)]
        while stack:
            node, visited = stack.pop()
            if visited:
                res.append(node.val)
            else:
                stack.append((node, True))
                for child in reversed(node.children):
                    stack.append((child, False))
        return res
```

```java
/*
// Definition for a Node.
class Node {
    public int val;
    public List<Node> children;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, List<Node> _children) {
        val = _val;
        children = _children;
    }
}
*/

public class Solution {
    public List<Integer> postorder(Node root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) return res;

        Stack<Pair<Node, Boolean>> stack = new Stack<>();
        stack.push(new Pair<>(root, false));

        while (!stack.isEmpty()) {
            Pair<Node, Boolean> p = stack.pop();
            Node node = p.getKey();
            boolean visited = p.getValue();

            if (visited) {
                res.add(node.val);
            } else {
                stack.push(new Pair<>(node, true));
                for (int i = node.children.size() - 1; i >= 0; i--) {
                    stack.push(new Pair<>(node.children.get(i), false));
                }
            }
        }

        return res;
    }
}
```

```cpp
/*
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> children;

    Node() {}

    Node(int _val) {
        val = _val;
    }

    Node(int _val, vector<Node*> _children) {
        val = _val;
        children = _children;
    }
};
*/

class Solution {
public:
    vector<int> postorder(Node* root) {
        vector<int> res;
        if (!root) return res;

        stack<pair<Node*, bool>> st;
        st.push({root, false});

        while (!st.empty()) {
            auto [node, visited] = st.top();
            st.pop();

            if (visited) {
                res.push_back(node->val);
            } else {
                st.push({node, true});
                for (int i = (int)node->children.size() - 1; i >= 0; i--) {
                    st.push({node->children[i], false});
                }
            }
        }

        return res;
    }
};
```

```javascript
/**
 * Definition for a binary tree node.
 * class Node {
 *     constructor(val = 0, children = []) {
 *         this.val = val;
 *         this.children = children;
 *     }
 * }
 */
class Solution {
    /**
     * @param {Node|null} root
     * @return {number[]}
     */
    postorder(root) {
        const res = [];
        if (!root) return res;

        const stack = [[root, false]];

        while (stack.length) {
            const [node, visited] = stack.pop();

            if (visited) {
                res.push(node.val);
            } else {
                stack.push([node, true]);
                for (let i = node.children.length - 1; i >= 0; i--) {
                    stack.push([node.children[i], false]);
                }
            }
        }

        return res;
    }
}
```

```csharp
/*
// Definition for a Node.
public class Node {
    public int val;
    public List<Node> children;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, IList<Node> _children) {
        val = _val;
        children = _children;
    }
}
*/

public class Solution {
    public List<int> Postorder(Node root) {
        List<int> res = new List<int>();
        if (root == null) return res;

        Stack<(Node, bool)> stack = new Stack<(Node, bool)>();
        stack.Push((root, false));

        while (stack.Count > 0) {
            var (node, visited) = stack.Pop();

            if (visited) {
                res.Add(node.val);
            } else {
                stack.Push((node, true));
                for (int i = node.children.Count - 1; i >= 0; i--) {
                    stack.Push((node.children[i], false));
                }
            }
        }

        return res;
    }
}
```

```go
/**
 * Definition for a Node.
 * type Node struct {
 *     Val int
 *     Children []*Node
 * }
 */

func postorder(root *Node) []int {
    res := []int{}
    if root == nil {
        return res
    }

    type pair struct {
        node    *Node
        visited bool
    }

    stack := []pair{{root, false}}

    for len(stack) > 0 {
        p := stack[len(stack)-1]
        stack = stack[:len(stack)-1]

        if p.visited {
            res = append(res, p.node.Val)
        } else {
            stack = append(stack, pair{p.node, true})
            for i := len(p.node.Children) - 1; i >= 0; i-- {
                stack = append(stack, pair{p.node.Children[i], false})
            }
        }
    }

    return res
}
```

```kotlin
/**
 * Definition for a Node.
 * class Node(var `val`: Int) {
 *     var children: List<Node?> = listOf()
 * }
 */

class Solution {
    fun postorder(root: Node?): List<Int> {
        val res = mutableListOf<Int>()
        if (root == null) return res

        val stack = ArrayDeque<Pair<Node, Boolean>>()
        stack.addLast(Pair(root, false))

        while (stack.isNotEmpty()) {
            val (node, visited) = stack.removeLast()

            if (visited) {
                res.add(node.`val`)
            } else {
                stack.addLast(Pair(node, true))
                for (i in node.children.size - 1 downTo 0) {
                    node.children[i]?.let { stack.addLast(Pair(it, false)) }
                }
            }
        }

        return res
    }
}
```

```swift
/**
 * Definition for a Node.
 * public class Node {
 *     public var val: Int
 *     public var children: [Node]
 *     public init(_ val: Int) {
 *         self.val = val
 *         self.children = []
 *     }
 * }
 */

class Solution {
    func postorder(_ root: Node?) -> [Int] {
        var res = [Int]()
        guard let root = root else { return res }

        var stack: [(Node, Bool)] = [(root, false)]

        while !stack.isEmpty {
            let (node, visited) = stack.removeLast()

            if visited {
                res.append(node.val)
            } else {
                stack.append((node, true))
                for i in stride(from: node.children.count - 1, through: 0, by: -1) {
                    stack.append((node.children[i], false))
                }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$