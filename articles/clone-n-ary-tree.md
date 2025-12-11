## 1. Recursion

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(M)$
- Space complexity: $O(M)$

>  Where $M$ is the number of nodes in the input tree.

---

## 2. DFS with Iteration

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(M)$
- Space complexity: $O(\log_{n}{M})$

>  Where $M$ is the number of nodes in the input tree and $N$ is the maximum number of children that a node can have

---

## 3. BFS

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(M)$
- Space complexity: $O(M)$

>  Where $M$ is the number of nodes in the input tree.
