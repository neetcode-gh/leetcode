## 1. Recursion

### Intuition
Cloning an N-ary tree is a natural fit for recursion. For each node, we create a copy with the same value, then recursively clone all of its children. The recursive structure mirrors the tree structure itself, making the solution straightforward and elegant.

### Algorithm
1. Base case: If the node is `null`, return `null`.
2. Create a new node with the same value as the current node.
3. For each child of the current node, recursively clone the child and add it to the new node's children list.
4. Return the newly created node.

::tabs-start

```python
class Solution:
    def cloneTree(self, root: 'Node') -> 'Node':

        # Base case: empty node.
        if not root:
            return root

        # First, copy the node itself.
        node_copy = Node(root.val)

        # Then, recursively clone the sub-trees.
        for child in root.children:
            node_copy.children.append(self.cloneTree(child))

        return node_copy
```

```java
class Solution {
    public Node cloneTree(Node root) {
        // Base case: empty node.
        if (root == null) {
            return root;
        }

        // First, copy the node itself.
        Node nodeCopy = new Node(root.val);

        // Then, recursively clone the sub-trees.
        for (Node child : root.children) {
            nodeCopy.children.add(this.cloneTree(child));
        }

        return nodeCopy;
    }
}
```

```cpp
class Solution {
public:
    Node* cloneTree(Node* root) {
        // Base case: empty node.
        if (!root) {
            return root;
        }
        
        // First, copy the node itself.
        Node* node_copy = new Node(root->val);
        
        // Then, recursively clone the sub-trees.
        for (Node* child : root->children) {
            node_copy->children.push_back(cloneTree(child));
        }
        
        return node_copy;
    }
};
```

```javascript
class Solution {
    /**
     * @param {_Node|null} root
     * @return {_Node|null}
     */
    cloneTree(root) {
        // Base case: empty node.
        if (!root) {
            return root;
        }

        // First, copy the node itself.
        const node_copy = new Node(root.val);

        // Then, recursively clone the sub-trees.
        for (const child of root.children) {
            node_copy.children.push(this.cloneTree(child));
        }

        return node_copy;
    }
}
```

```csharp
/*
// Definition for a Node.
public class Node {
    public int val;
    public IList<Node> children;

    public Node() {
        val = 0;
        children = new List<Node>();
    }

    public Node(int _val) {
        val = _val;
        children = new List<Node>();
    }
}
*/

public class Solution {
    public Node CloneTree(Node root) {
        // Base case: empty node.
        if (root == null) {
            return root;
        }

        // First, copy the node itself.
        Node nodeCopy = new Node(root.val);

        // Then, recursively clone the sub-trees.
        foreach (Node child in root.children) {
            nodeCopy.children.Add(CloneTree(child));
        }

        return nodeCopy;
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

func cloneTree(root *Node) *Node {
    // Base case: empty node.
    if root == nil {
        return root
    }

    // First, copy the node itself.
    nodeCopy := &Node{Val: root.Val}

    // Then, recursively clone the sub-trees.
    for _, child := range root.Children {
        nodeCopy.Children = append(nodeCopy.Children, cloneTree(child))
    }

    return nodeCopy
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
    fun cloneTree(root: Node?): Node? {
        // Base case: empty node.
        if (root == null) {
            return root
        }

        // First, copy the node itself.
        val nodeCopy = Node(root.`val`)

        // Then, recursively clone the sub-trees.
        nodeCopy.children = root.children.map { cloneTree(it) }

        return nodeCopy
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
    func cloneTree(_ root: Node?) -> Node? {
        // Base case: empty node.
        guard let root = root else {
            return nil
        }

        // First, copy the node itself.
        let nodeCopy = Node(root.val)

        // Then, recursively clone the sub-trees.
        for child in root.children {
            if let clonedChild = cloneTree(child) {
                nodeCopy.children.append(clonedChild)
            }
        }

        return nodeCopy
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(M)$
- Space complexity: $O(M)$

>  Where $M$ is the number of nodes in the input tree.

---

## 2. DFS with Iteration

### Intuition
We can avoid recursion by using an explicit stack. We maintain pairs of (original node, cloned node) on the stack. When we pop a pair, we iterate through the original node's children, create cloned children, link them to the cloned parent, and push the new pairs onto the stack for further processing.

### Algorithm
1. If root is `null`, return `null`.
2. Create the cloned root and push the pair (root, new_root) onto a stack.
3. While the stack is not empty:
   - Pop a pair (old_node, new_node).
   - For each child of old_node:
     - Create a new cloned child node.
     - Append the cloned child to new_node's children.
     - Push the pair (child, new_child) onto the stack.
4. Return the cloned root.

::tabs-start

```python
class Solution:
    def cloneTree(self, root: 'Node') -> 'Node':

        if not root:
            return root

        new_root = Node(root.val)
        # Starting point to kick off the DFS visits.
        stack = [(root, new_root)]

        while stack:
            old_node, new_node = stack.pop()
            for child_node in old_node.children:
                new_child_node = Node(child_node.val)

                # Make a copy for each child node.
                new_node.children.append(new_child_node)

                # Schedule a visit to copy the child nodes of each child node.
                stack.append((child_node, new_child_node))

        return new_root
```

```java
class Solution {
    public Node cloneTree(Node root) {
        if (root == null) {
            return root;
        }

        Node newRoot = new Node(root.val);

        // Here we used the ArrayDeque instead of the Queue class,
        // which is a more efficient implementation of queue data structure.
        Deque<Node[]> stack = new ArrayDeque<>();

        // Starting point to kick off the DFS visits.
        stack.addLast(new Node[]{root, newRoot});

        while (!stack.isEmpty()) {
            Node[] nodePair = stack.pop();
            Node oldNode = nodePair[0];
            Node newNode = nodePair[1];
            for (Node childNode : oldNode.children) {
                Node newChildNode = new Node(childNode.val);

                // Make a copy for each child node.
                newNode.children.add(newChildNode);

                // Schedule a visit to copy the child nodes of each child node.
                stack.push(new Node[]{childNode, newChildNode});
            }
        }

        return newRoot;
    }
}
```

```cpp
class Solution {
public:
    Node* cloneTree(Node* root) {
        if (!root) {
            return root;
        }
        
        Node* new_root = new Node(root->val);
        // Starting point to kick off the DFS visits.
        stack<pair<Node*, Node*>> st;
        st.push({root, new_root});
        
        while (!st.empty()) {
            auto [old_node, new_node] = st.top();
            st.pop();
            
            for (Node* child_node : old_node->children) {
                Node* new_child_node = new Node(child_node->val);
                // Make a copy for each child node.
                new_node->children.push_back(new_child_node);
                // Schedule a visit to copy the child nodes of each child node.
                st.push({child_node, new_child_node});
            }
        }
        
        return new_root;
    }
};
```

```javascript
class Solution {
    /**
     * @param {_Node|null} node
     * @return {_Node|null}
     */
    cloneTree(root) {
        if (!root) {
            return root;
        }

        const new_root = new Node(root.val);
        // Starting point to kick off the DFS visits.
        const stack = [[root, new_root]];

        while (stack.length > 0) {
            const [old_node, new_node] = stack.pop();

            for (const child_node of old_node.children) {
                const new_child_node = new Node(child_node.val);
                // Make a copy for each child node.
                new_node.children.push(new_child_node);
                // Schedule a visit to copy the child nodes of each child node.
                stack.push([child_node, new_child_node]);
            }
        }

        return new_root;
    }
}
```

```csharp
public class Solution {
    public Node CloneTree(Node root) {
        if (root == null) {
            return root;
        }

        Node newRoot = new Node(root.val);
        // Starting point to kick off the DFS visits.
        Stack<Node[]> stack = new Stack<Node[]>();
        stack.Push(new Node[] { root, newRoot });

        while (stack.Count > 0) {
            Node[] nodePair = stack.Pop();
            Node oldNode = nodePair[0];
            Node newNode = nodePair[1];

            foreach (Node childNode in oldNode.children) {
                Node newChildNode = new Node(childNode.val);
                // Make a copy for each child node.
                newNode.children.Add(newChildNode);
                // Schedule a visit to copy the child nodes of each child node.
                stack.Push(new Node[] { childNode, newChildNode });
            }
        }

        return newRoot;
    }
}
```

```go
func cloneTree(root *Node) *Node {
    if root == nil {
        return root
    }

    newRoot := &Node{Val: root.Val}
    // Starting point to kick off the DFS visits.
    stack := [][2]*Node{{root, newRoot}}

    for len(stack) > 0 {
        pair := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        oldNode, newNode := pair[0], pair[1]

        for _, childNode := range oldNode.Children {
            newChildNode := &Node{Val: childNode.Val}
            // Make a copy for each child node.
            newNode.Children = append(newNode.Children, newChildNode)
            // Schedule a visit to copy the child nodes of each child node.
            stack = append(stack, [2]*Node{childNode, newChildNode})
        }
    }

    return newRoot
}
```

```kotlin
class Solution {
    fun cloneTree(root: Node?): Node? {
        if (root == null) {
            return root
        }

        val newRoot = Node(root.`val`)
        // Starting point to kick off the DFS visits.
        val stack = ArrayDeque<Pair<Node, Node>>()
        stack.addLast(Pair(root, newRoot))

        while (stack.isNotEmpty()) {
            val (oldNode, newNode) = stack.removeLast()
            val newChildren = mutableListOf<Node?>()

            for (childNode in oldNode.children) {
                if (childNode != null) {
                    val newChildNode = Node(childNode.`val`)
                    // Make a copy for each child node.
                    newChildren.add(newChildNode)
                    // Schedule a visit to copy the child nodes of each child node.
                    stack.addLast(Pair(childNode, newChildNode))
                }
            }
            newNode.children = newChildren
        }

        return newRoot
    }
}
```

```swift
class Solution {
    func cloneTree(_ root: Node?) -> Node? {
        guard let root = root else {
            return nil
        }

        let newRoot = Node(root.val)
        // Starting point to kick off the DFS visits.
        var stack: [(Node, Node)] = [(root, newRoot)]

        while !stack.isEmpty {
            let (oldNode, newNode) = stack.removeLast()

            for childNode in oldNode.children {
                let newChildNode = Node(childNode.val)
                // Make a copy for each child node.
                newNode.children.append(newChildNode)
                // Schedule a visit to copy the child nodes of each child node.
                stack.append((childNode, newChildNode))
            }
        }

        return newRoot
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(M)$
- Space complexity: $O(\log_{n}{M})$

>  Where $M$ is the number of nodes in the input tree and $N$ is the maximum number of children that a node can have

---

## 3. BFS

### Intuition
Instead of depth-first traversal with a stack, we can use breadth-first traversal with a queue. This processes nodes level by level. The logic is the same as the iterative DFS approach, but we use a queue instead of a stack, removing from the front instead of the back.

### Algorithm
1. If root is `null`, return `null`.
2. Create the cloned root and enqueue the pair (root, new_root).
3. While the queue is not empty:
   - Dequeue a pair (old_node, new_node) from the front.
   - For each child of old_node:
     - Create a new cloned child node.
     - Append the cloned child to new_node's children.
     - Enqueue the pair (child, new_child).
4. Return the cloned root.

::tabs-start

```python
class Solution:
    def cloneTree(self, root: 'Node') -> 'Node':

        if not root:
            return root

        new_root = Node(root.val)
        # Starting point to kick off the BFS visits.
        queue = deque([(root, new_root)])

        while queue:
            # Get the element from the head of the queue.
            old_node, new_node = queue.popleft()

            for child_node in old_node.children:
                new_child_node = Node(child_node.val)

                # Make a copy for each child node.
                new_node.children.append(new_child_node)

                # Schedule a visit to copy the child nodes of each child node.
                queue.append((child_node, new_child_node))

        return new_root
```

```java
class Solution {
    public Node cloneTree(Node root) {
        if (root == null) {
            return root;
        }

        Node newRoot = new Node(root.val);

        // Starting point to kick off the BFS visits.
        // Here we used the ArrayDeque instead of the Queue class,
        // which is a more efficient implementation of queue data structure.
        Deque<Node[]> queue = new ArrayDeque<>();
        queue.addLast(new Node[]{root, newRoot});

        while (!queue.isEmpty()) {
            Node[] nodePair = queue.removeFirst();

            Node oldNode = nodePair[0];
            Node newNode = nodePair[1];
            for (Node childNode : oldNode.children) {
                Node newChildNode = new Node(childNode.val);

                // Make a copy for each child node.
                newNode.children.add(newChildNode);

                // Schedule a visit to copy the child nodes of each child node.
                queue.addLast(new Node[]{childNode, newChildNode});
            }
        }

        return newRoot;
    }
}
```

```cpp
class Solution {
public:
    Node* cloneTree(Node* root) {
        if (!root) {
            return root;
        }
        
        Node* new_root = new Node(root->val);
        // Starting point to kick off the BFS visits.
        queue<pair<Node*, Node*>> q;
        q.push({root, new_root});
        
        while (!q.empty()) {
            // Get the element from the head of the queue.
            auto [old_node, new_node] = q.front();
            q.pop();
            
            for (Node* child_node : old_node->children) {
                Node* new_child_node = new Node(child_node->val);
                // Make a copy for each child node.
                new_node->children.push_back(new_child_node);
                // Schedule a visit to copy the child nodes of each child node.
                q.push({child_node, new_child_node});
            }
        }
        
        return new_root;
    }
};
```

```javascript
class Solution {
    /**
     * @param {_Node|null} root
     * @return {_Node|null}
     */
    cloneTree(root) {
        if (!root) {
            return root;
        }

        const new_root = new Node(root.val);
        // Starting point to kick off the BFS visits.
        const queue = [[root, new_root]];

        while (queue.length > 0) {
            // Get the element from the head of the queue.
            const [old_node, new_node] = queue.shift();

            for (const child_node of old_node.children) {
                const new_child_node = new Node(child_node.val);
                // Make a copy for each child node.
                new_node.children.push(new_child_node);
                // Schedule a visit to copy the child nodes of each child node.
                queue.push([child_node, new_child_node]);
            }
        }

        return new_root;
    }
}
```

```csharp
public class Solution {
    public Node CloneTree(Node root) {
        if (root == null) {
            return root;
        }

        Node newRoot = new Node(root.val);
        // Starting point to kick off the BFS visits.
        Queue<Node[]> queue = new Queue<Node[]>();
        queue.Enqueue(new Node[] { root, newRoot });

        while (queue.Count > 0) {
            Node[] nodePair = queue.Dequeue();
            Node oldNode = nodePair[0];
            Node newNode = nodePair[1];

            foreach (Node childNode in oldNode.children) {
                Node newChildNode = new Node(childNode.val);
                // Make a copy for each child node.
                newNode.children.Add(newChildNode);
                // Schedule a visit to copy the child nodes of each child node.
                queue.Enqueue(new Node[] { childNode, newChildNode });
            }
        }

        return newRoot;
    }
}
```

```go
func cloneTree(root *Node) *Node {
    if root == nil {
        return root
    }

    newRoot := &Node{Val: root.Val}
    // Starting point to kick off the BFS visits.
    queue := [][2]*Node{{root, newRoot}}

    for len(queue) > 0 {
        // Get the element from the head of the queue.
        pair := queue[0]
        queue = queue[1:]
        oldNode, newNode := pair[0], pair[1]

        for _, childNode := range oldNode.Children {
            newChildNode := &Node{Val: childNode.Val}
            // Make a copy for each child node.
            newNode.Children = append(newNode.Children, newChildNode)
            // Schedule a visit to copy the child nodes of each child node.
            queue = append(queue, [2]*Node{childNode, newChildNode})
        }
    }

    return newRoot
}
```

```kotlin
class Solution {
    fun cloneTree(root: Node?): Node? {
        if (root == null) {
            return root
        }

        val newRoot = Node(root.`val`)
        // Starting point to kick off the BFS visits.
        val queue = ArrayDeque<Pair<Node, Node>>()
        queue.addLast(Pair(root, newRoot))

        while (queue.isNotEmpty()) {
            val (oldNode, newNode) = queue.removeFirst()
            val newChildren = mutableListOf<Node?>()

            for (childNode in oldNode.children) {
                if (childNode != null) {
                    val newChildNode = Node(childNode.`val`)
                    // Make a copy for each child node.
                    newChildren.add(newChildNode)
                    // Schedule a visit to copy the child nodes of each child node.
                    queue.addLast(Pair(childNode, newChildNode))
                }
            }
            newNode.children = newChildren
        }

        return newRoot
    }
}
```

```swift
class Solution {
    func cloneTree(_ root: Node?) -> Node? {
        guard let root = root else {
            return nil
        }

        let newRoot = Node(root.val)
        // Starting point to kick off the BFS visits.
        var queue: [(Node, Node)] = [(root, newRoot)]

        while !queue.isEmpty {
            // Get the element from the head of the queue.
            let (oldNode, newNode) = queue.removeFirst()

            for childNode in oldNode.children {
                let newChildNode = Node(childNode.val)
                // Make a copy for each child node.
                newNode.children.append(newChildNode)
                // Schedule a visit to copy the child nodes of each child node.
                queue.append((childNode, newChildNode))
            }
        }

        return newRoot
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(M)$
- Space complexity: $O(M)$

>  Where $M$ is the number of nodes in the input tree.
