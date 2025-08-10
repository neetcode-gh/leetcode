## 1. Depth First Search

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$ for the recursion stack.

---

## 2. Iterative DFS

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$