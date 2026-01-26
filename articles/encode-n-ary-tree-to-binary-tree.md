## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Binary Tree Traversal** - Understanding left/right child relationships and how to build binary trees
- **N-ary Tree Structure** - Familiarity with trees where nodes can have multiple children stored in a list
- **BFS (Breadth-First Search)** - Using queues to process nodes level by level
- **DFS (Depth-First Search)** - Recursive tree traversal for encoding/decoding operations
- **Left-Child Right-Sibling Representation** - The key encoding technique where first child becomes left child and siblings chain as right children

---

## 1. BFS (Breadth-First Search) Traversal

### Intuition

To encode an N-ary tree into a binary tree, we need a consistent rule for representing multiple children. The standard approach is the "left-child right-sibling" representation: the first child of an N-ary node becomes the left child of the binary node, and subsequent siblings are chained as right children. Using BFS, we process nodes level by level, building the binary tree structure while maintaining the parent-child relationships through a queue.

### Algorithm

**Encode:**
1. If the root is `null`, return `null`.
2. Create a binary tree root with the same value.
3. Use a queue storing pairs of (binary node, N-ary node).
4. For each N-ary node's children:
   - Link them as a chain: first child to `left`, rest as `right` siblings.
   - Add each child pair to the queue.
5. Return the binary tree root.

**Decode:**
1. If the root is `null`, return `null`.
2. Create an N-ary root with the same value and an empty children list.
3. Use a queue storing pairs of (N-ary node, binary node).
4. For each binary node:
   - Traverse the `left` child's `right` chain to reconstruct all children.
   - Add each child pair to the queue.
5. Return the N-ary tree root.

::tabs-start

```python
"""
# Definition for a Node.
class Node(object):
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children
"""

"""
# Definition for a binary tree node.
class TreeNode(object):
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None
"""

class Codec:
    def encode(self, root):
        """Encodes an n-ary tree to a binary tree.
        """
        if not root:
            return None

        rootNode = TreeNode(root.val)
        queue = deque([(rootNode, root)])

        while queue:
            parent, curr = queue.popleft()
            prevBNode = None
            headBNode = None
            # traverse each child one by one
            for child in curr.children:
                newBNode = TreeNode(child.val)
                if prevBNode:
                    prevBNode.right = newBNode
                else:
                    headBNode = newBNode
                prevBNode = newBNode
                queue.append((newBNode, child))

            # use the first child in the left node of parent
            parent.left = headBNode

        return rootNode


    def decode(self, data):
        """Decodes your binary tree to an n-ary tree.
        """
        if not data:
            return None

        # should set the default value to [] rather than None,
        # otherwise it wont pass the test cases.
        rootNode = Node(data.val, [])

        queue = deque([(rootNode, data)])

        while queue:
            parent, curr = queue.popleft()

            firstChild = curr.left
            sibling = firstChild

            while sibling:
                # Note: the initial value of the children list should not be None, which is assumed by the online judge.
                newNode = Node(sibling.val, [])
                parent.children.append(newNode)
                queue.append((newNode, sibling))
                sibling = sibling.right

        return rootNode
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
};
*/

/*
// Definition for a binary tree node.
public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}
*/

class Pair<U, V> {
    public U first;
    public V second;

    public Pair(U first, V second) {
        this.first = first;
        this.second = second;
    }
}

class Codec {

    // Encodes an n-ary tree to a binary tree.
    public TreeNode encode(Node root) {
        if (root == null) {
            return null;
        }
        
        TreeNode newRoot = new TreeNode(root.val);
        Pair<TreeNode, Node> head = new Pair<TreeNode, Node>(newRoot, root);

        // Add the first element to kickoff the loop
        Queue<Pair<TreeNode, Node>> queue = new ArrayDeque<Pair<TreeNode, Node>>();
        queue.add(head);

        while (queue.size() > 0) {
            Pair<TreeNode, Node> pair = queue.remove();
            TreeNode bNode = pair.first;
            Node nNode = pair.second;

            // Encoding the children nodes into a list of TreeNode.
            TreeNode prevBNode = null;
            TreeNode headBNode = null;
            
            for (Node nChild : nNode.children) {
                TreeNode newBNode = new TreeNode(nChild.val);
                if (prevBNode == null) {
                    headBNode = newBNode;
                } else {
                    prevBNode.right = newBNode;
                }
                prevBNode = newBNode;

                Pair<TreeNode, Node> nextEntry = new Pair<TreeNode, Node>(newBNode, nChild);
                queue.add(nextEntry);
            }

            // Attach the list of children to the left node.
            bNode.left = headBNode;
        }

        return newRoot;
    }

    // Decodes your binary tree to an n-ary tree.
    public Node decode(TreeNode root) {
        if (root == null) {
            return null;
        }
        
        Node newRoot = new Node(root.val, new ArrayList<Node>());

        // adding the first element to kickoff the loop
        Queue<Pair<Node, TreeNode>> queue = new ArrayDeque<Pair<Node, TreeNode>>();
        Pair<Node, TreeNode> head = new Pair<Node, TreeNode>(newRoot, root);
        queue.add(head);

        while (queue.size() > 0) {
            Pair<Node, TreeNode> entry = queue.remove();
            Node nNode = entry.first;
            TreeNode bNode = entry.second;

            // Decoding the children list
            TreeNode firstChild = bNode.left;
            TreeNode sibling = firstChild;
            
            while (sibling != null) {
                Node nChild = new Node(sibling.val, new ArrayList<Node>());
                nNode.children.add(nChild);

                // prepare the decoding the children of the child, by standing in the queue.
                Pair<Node, TreeNode> nextEntry = new Pair<Node, TreeNode>(nChild, sibling);
                queue.add(nextEntry);

                sibling = sibling.right;
            }
        }

        return newRoot;
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

/*
// Definition for a binary tree node.
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};
*/

class Codec {
public:
    // Encodes an n-ary tree to a binary tree.
    TreeNode* encode(Node* root) {
        if (!root) return nullptr;
        
        TreeNode* rootNode = new TreeNode(root->val);
        queue<pair<TreeNode*, Node*>> q;
        q.push({rootNode, root});
        
        while (!q.empty()) {
            auto [parent, curr] = q.front();
            q.pop();
            
            TreeNode* prevBNode = nullptr;
            TreeNode* headBNode = nullptr;
            
            // Traverse each child one by one
            for (Node* child : curr->children) {
                TreeNode* newBNode = new TreeNode(child->val);
                if (prevBNode) {
                    prevBNode->right = newBNode;
                } else {
                    headBNode = newBNode;
                }
                prevBNode = newBNode;
                q.push({newBNode, child});
            }
            
            // Use the first child in the left node of parent
            parent->left = headBNode;
        }
        
        return rootNode;
    }
    
    // Decodes your binary tree to an n-ary tree.
    Node* decode(TreeNode* data) {
        if (!data) return nullptr;
        
        Node* rootNode = new Node(data->val, vector<Node*>());
        queue<pair<Node*, TreeNode*>> q;
        q.push({rootNode, data});
        
        while (!q.empty()) {
            auto [parent, curr] = q.front();
            q.pop();
            
            TreeNode* firstChild = curr->left;
            TreeNode* sibling = firstChild;
            
            while (sibling) {
                Node* newNode = new Node(sibling->val, vector<Node*>());
                parent->children.push_back(newNode);
                q.push({newNode, sibling});
                sibling = sibling->right;
            }
        }
        
        return rootNode;
    }
};
```

```javascript
/**
 * Definition for a _Node.
 * class Node {
 *     constructor(val = 0, children = []) {
 *         this.val = val;
 *         this.children = children;
 *     }
 * }
 */

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     constructor(val) {
 *         this.val = val;
 *         this.left = null;
 *         this.right = null;
 *     }
 * }
 */

class Codec {
    constructor() {
    }

    /**
     * @param {_Node|null} root
     * @return {TreeNode|null}
     */
    // Encodes an n-ary tree to a binary tree.
    encode = function(root) {
        if (!root) {
            return null;
        }

        const rootNode = new TreeNode(root.val);
        const queue = new Deque([[rootNode, root]]); // Using @datastructures-js/deque

        while (!queue.isEmpty()) {
            const [parent, curr] = queue.popFront();
            let prevBNode = null;
            let headBNode = null;

            // traverse each child one by one
            for (const child of curr.children) {
                const newBNode = new TreeNode(child.val);
                if (prevBNode) {
                    prevBNode.right = newBNode;
                } else {
                    headBNode = newBNode;
                }
                prevBNode = newBNode;
                queue.pushBack([newBNode, child]);
            }

            // use the first child in the left node of parent
            parent.left = headBNode;
        }

        return rootNode;
    }

    /**
     * @param {TreeNode|null} data
     * @return {_Node|null}
     */
    // Decodes your binary tree to an n-ary tree.
    decode = function(data) {
        if (!data) {
            return null;
        }

        const rootNode = new _Node(data.val, []);
        const queue = new Deque([[rootNode, data]]); // Using @datastructures-js/deque

        while (!queue.isEmpty()) {
            const [parent, curr] = queue.popFront();
            let firstChild = curr.left;
            let sibling = firstChild;

            while (sibling) {
                const newNode = new _Node(sibling.val, []);
                parent.children.push(newNode);
                queue.pushBack([newNode, sibling]);
                sibling = sibling.right;
            }
        }

        return rootNode;
    }
}
```

```csharp
/*
// Definition for a Node.
public class Node {
    public int val;
    public IList<Node> children;

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

/*
// Definition for a binary tree node.
public class TreeNode {
    public int val;
    public TreeNode left;
    public TreeNode right;
    public TreeNode(int x) { val = x; }
}
*/

public class Codec {
    // Encodes an n-ary tree to a binary tree.
    public TreeNode encode(Node root) {
        if (root == null) return null;

        TreeNode rootNode = new TreeNode(root.val);
        Queue<(TreeNode, Node)> queue = new Queue<(TreeNode, Node)>();
        queue.Enqueue((rootNode, root));

        while (queue.Count > 0) {
            var (parent, curr) = queue.Dequeue();
            TreeNode prevBNode = null;
            TreeNode headBNode = null;

            foreach (var child in curr.children) {
                TreeNode newBNode = new TreeNode(child.val);
                if (prevBNode != null) {
                    prevBNode.right = newBNode;
                } else {
                    headBNode = newBNode;
                }
                prevBNode = newBNode;
                queue.Enqueue((newBNode, child));
            }

            parent.left = headBNode;
        }

        return rootNode;
    }

    // Decodes your binary tree to an n-ary tree.
    public Node decode(TreeNode data) {
        if (data == null) return null;

        Node rootNode = new Node(data.val, new List<Node>());
        Queue<(Node, TreeNode)> queue = new Queue<(Node, TreeNode)>();
        queue.Enqueue((rootNode, data));

        while (queue.Count > 0) {
            var (parent, curr) = queue.Dequeue();
            TreeNode sibling = curr.left;

            while (sibling != null) {
                Node newNode = new Node(sibling.val, new List<Node>());
                parent.children.Add(newNode);
                queue.Enqueue((newNode, sibling));
                sibling = sibling.right;
            }
        }

        return rootNode;
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

/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */

type Codec struct {
}

func Constructor() *Codec {
    return &Codec{}
}

func (this *Codec) encode(root *Node) *TreeNode {
    if root == nil {
        return nil
    }

    rootNode := &TreeNode{Val: root.Val}
    queue := []struct {
        parent *TreeNode
        curr   *Node
    }{{rootNode, root}}

    for len(queue) > 0 {
        pair := queue[0]
        queue = queue[1:]
        parent, curr := pair.parent, pair.curr

        var prevBNode, headBNode *TreeNode

        for _, child := range curr.Children {
            newBNode := &TreeNode{Val: child.Val}
            if prevBNode != nil {
                prevBNode.Right = newBNode
            } else {
                headBNode = newBNode
            }
            prevBNode = newBNode
            queue = append(queue, struct {
                parent *TreeNode
                curr   *Node
            }{newBNode, child})
        }

        parent.Left = headBNode
    }

    return rootNode
}

func (this *Codec) decode(data *TreeNode) *Node {
    if data == nil {
        return nil
    }

    rootNode := &Node{Val: data.Val, Children: []*Node{}}
    queue := []struct {
        parent *Node
        curr   *TreeNode
    }{{rootNode, data}}

    for len(queue) > 0 {
        pair := queue[0]
        queue = queue[1:]
        parent, curr := pair.parent, pair.curr

        sibling := curr.Left
        for sibling != nil {
            newNode := &Node{Val: sibling.Val, Children: []*Node{}}
            parent.Children = append(parent.Children, newNode)
            queue = append(queue, struct {
                parent *Node
                curr   *TreeNode
            }{newNode, sibling})
            sibling = sibling.Right
        }
    }

    return rootNode
}
```

```kotlin
/**
 * Definition for a Node.
 * class Node(var `val`: Int) {
 *     var children: List<Node?> = listOf()
 * }
 */

/**
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */

class Codec {
    // Encodes an n-ary tree to a binary tree.
    fun encode(root: Node?): TreeNode? {
        if (root == null) return null

        val rootNode = TreeNode(root.`val`)
        val queue: ArrayDeque<Pair<TreeNode, Node>> = ArrayDeque()
        queue.add(Pair(rootNode, root))

        while (queue.isNotEmpty()) {
            val (parent, curr) = queue.removeFirst()
            var prevBNode: TreeNode? = null
            var headBNode: TreeNode? = null

            for (child in curr.children) {
                child?.let {
                    val newBNode = TreeNode(it.`val`)
                    if (prevBNode != null) {
                        prevBNode!!.right = newBNode
                    } else {
                        headBNode = newBNode
                    }
                    prevBNode = newBNode
                    queue.add(Pair(newBNode, it))
                }
            }

            parent.left = headBNode
        }

        return rootNode
    }

    // Decodes your binary tree to an n-ary tree.
    fun decode(data: TreeNode?): Node? {
        if (data == null) return null

        val rootNode = Node(data.`val`)
        rootNode.children = mutableListOf()
        val queue: ArrayDeque<Pair<Node, TreeNode>> = ArrayDeque()
        queue.add(Pair(rootNode, data))

        while (queue.isNotEmpty()) {
            val (parent, curr) = queue.removeFirst()
            var sibling = curr.left
            val children = mutableListOf<Node>()

            while (sibling != null) {
                val newNode = Node(sibling.`val`)
                newNode.children = mutableListOf()
                children.add(newNode)
                queue.add(Pair(newNode, sibling))
                sibling = sibling.right
            }

            parent.children = children
        }

        return rootNode
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

/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     public var val: Int
 *     public var left: TreeNode?
 *     public var right: TreeNode?
 *     public init(_ val: Int) {
 *         self.val = val
 *         self.left = nil
 *         self.right = nil
 *     }
 * }
 */

class Codec {
    // Encodes an n-ary tree to a binary tree.
    func encode(_ root: Node?) -> TreeNode? {
        guard let root = root else { return nil }

        let rootNode = TreeNode(root.val)
        var queue: [(TreeNode, Node)] = [(rootNode, root)]

        while !queue.isEmpty {
            let (parent, curr) = queue.removeFirst()
            var prevBNode: TreeNode? = nil
            var headBNode: TreeNode? = nil

            for child in curr.children {
                let newBNode = TreeNode(child.val)
                if let prev = prevBNode {
                    prev.right = newBNode
                } else {
                    headBNode = newBNode
                }
                prevBNode = newBNode
                queue.append((newBNode, child))
            }

            parent.left = headBNode
        }

        return rootNode
    }

    // Decodes your binary tree to an n-ary tree.
    func decode(_ data: TreeNode?) -> Node? {
        guard let data = data else { return nil }

        let rootNode = Node(data.val)
        var queue: [(Node, TreeNode)] = [(rootNode, data)]

        while !queue.isEmpty {
            let (parent, curr) = queue.removeFirst()
            var sibling = curr.left

            while let sib = sibling {
                let newNode = Node(sib.val)
                parent.children.append(newNode)
                queue.append((newNode, sib))
                sibling = sib.right
            }
        }

        return rootNode
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$

- Space complexity: 
    - `encode()` : $O(L)$.

    - `decode()` : $O(L)$.

    - Since $L$ is proportional to $N$ in the worst case, we could further generalize the space complexity to $O(N)$.

>  Where $N$ is the number of nodes in the N-ary tree, and $L$ is the maximum number of nodes that reside at the same level.

---

## 2. DFS (Depth-First Search) Traversal

### Intuition

DFS offers a more elegant recursive solution using the same left-child right-sibling encoding. For each N-ary node, we recursively encode its first child and attach it as the left child of the binary node. The remaining children are encoded and linked as right siblings of the first child. Decoding reverses this: we traverse the left child's right chain to rebuild the children list.

### Algorithm

**Encode:**
1. If the root is `null`, return `null`.
2. Create a binary node with the root's value.
3. Recursively encode the first child and set it as `left`.
4. For remaining children, recursively encode each and chain them as `right` siblings.
5. Return the binary node.

**Decode:**
1. If the root is `null`, return `null`.
2. Create an N-ary node with the root's value and an empty children list.
3. Start at the binary node's `left` child.
4. While the current sibling exists:
   - Recursively decode it and add to the children list.
   - Move to the `right` sibling.
5. Return the N-ary node.

::tabs-start

```python
"""
# Definition for a Node.
class Node(object):
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children
"""

"""
# Definition for a binary tree node.
class TreeNode(object):
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None
"""

class Codec:

    def encode(self, root):
        """Encodes an n-ary tree to a binary tree.
        """
        if not root:
            return None

        rootNode = TreeNode(root.val)
        if len(root.children) > 0:
            firstChild = root.children[0]
            rootNode.left = self.encode(firstChild)

        # the parent for the rest of the children
        curr = rootNode.left

        # encode the rest of the children
        for i in range(1, len(root.children)):
            curr.right = self.encode(root.children[i])
            curr = curr.right

        return rootNode


    def decode(self, data):
        """Decodes your binary tree to an n-ary tree.
        """
        if not data:
            return None

        rootNode = Node(data.val, [])

        curr = data.left
        while curr:
            rootNode.children.append(self.decode(curr))
            curr = curr.right

        return rootNode
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
};
*/

/**
 * Definition for a binary tree node.
 * public class TreeNode {
 * int val;
 * TreeNode left;
 * TreeNode right;
 * TreeNode(int x) { val = x; }
 * }
 */

class Codec {

    // Encodes an n-ary tree to a binary tree.
    public TreeNode encode(Node root) {
        if (root == null) {
            return null;
        }

        TreeNode newRoot = new TreeNode(root.val);

        // Encode the first child of n-ary node to the left node of binary tree.
        if (root.children.size() > 0) {
            Node firstChild = root.children.get(0);
            newRoot.left = this.encode(firstChild);
        }

        // Encoding the rest of the sibling nodes.
        TreeNode sibling = newRoot.left;
        for (int i = 1; i < root.children.size(); ++i) {
            sibling.right = this.encode(root.children.get(i));
            sibling = sibling.right;
        }

        return newRoot;
    }

    // Decodes your binary tree to an n-ary tree.
    public Node decode(TreeNode root) {
        if (root == null) {
            return null;
        }

        Node newRoot = new Node(root.val, new ArrayList<Node>());

        // Decoding all the children nodes
        TreeNode sibling = root.left;
        while (sibling != null) {
            newRoot.children.add(this.decode(sibling));
            sibling = sibling.right;
        }

        return newRoot;
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

/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */

class Codec {
public:
    // Encodes an n-ary tree to a binary tree.
    TreeNode* encode(Node* root) {
        if (!root) {
            return nullptr;
        }
        
        TreeNode* rootNode = new TreeNode(root->val);
        
        if (root->children.size() > 0) {
            Node* firstChild = root->children[0];
            rootNode->left = encode(firstChild);
        }
        
        // the parent for the rest of the children
        TreeNode* curr = rootNode->left;
        
        // encode the rest of the children
        for (int i = 1; i < root->children.size(); i++) {
            curr->right = encode(root->children[i]);
            curr = curr->right;
        }
        
        return rootNode;
    }
    
    // Decodes your binary tree to an n-ary tree.
    Node* decode(TreeNode* root) {
        if (!root) {
            return nullptr;
        }
        
        Node* rootNode = new Node(root->val);
        
        TreeNode* curr = root->left;
        while (curr) {
            rootNode->children.push_back(decode(curr));
            curr = curr->right;
        }
        
        return rootNode;
    }
};
```

```javascript
/**
 * Definition for a _Node.
 * class Node {
 *     constructor(val = 0, children = []) {
 *         this.val = val;
 *         this.children = children;
 *     }
 * }
 */

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     constructor(val) {
 *         this.val = val;
 *         this.left = null;
 *         this.right = null;
 *     }
 * }
 */

class Codec {
    constructor() {
    }

    /**
     * @param {_Node|null} root
     * @return {TreeNode|null}
     */
    // Encodes an n-ary tree to a binary tree.
    encode = function(root) {
        if (!root) {
            return null;
        }

        const rootNode = new TreeNode(root.val);

        if (root.children.length > 0) {
            const firstChild = root.children[0];
            rootNode.left = this.encode(firstChild);
        }

        // the parent for the rest of the children
        let curr = rootNode.left;

        // encode the rest of the children
        for (let i = 1; i < root.children.length; i++) {
            curr.right = this.encode(root.children[i]);
            curr = curr.right;
        }

        return rootNode;
    }

    /**
     * @param {TreeNode|null} data
     * @return {_Node|null}
     */
    // Decodes your binary tree to an n-ary tree.
    decode = function(data) {
        if (!data) {
            return null;
        }

        const rootNode = new _Node(data.val, []);

        let curr = data.left;
        while (curr) {
            rootNode.children.push(this.decode(curr));
            curr = curr.right;
        }

        return rootNode;
    }
}
```

```csharp
/*
// Definition for a Node.
public class Node {
    public int val;
    public IList<Node> children;

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

/*
// Definition for a binary tree node.
public class TreeNode {
    public int val;
    public TreeNode left;
    public TreeNode right;
    public TreeNode(int x) { val = x; }
}
*/

public class Codec {
    // Encodes an n-ary tree to a binary tree.
    public TreeNode encode(Node root) {
        if (root == null) return null;

        TreeNode rootNode = new TreeNode(root.val);

        if (root.children.Count > 0) {
            Node firstChild = root.children[0];
            rootNode.left = encode(firstChild);
        }

        TreeNode curr = rootNode.left;
        for (int i = 1; i < root.children.Count; i++) {
            curr.right = encode(root.children[i]);
            curr = curr.right;
        }

        return rootNode;
    }

    // Decodes your binary tree to an n-ary tree.
    public Node decode(TreeNode data) {
        if (data == null) return null;

        Node rootNode = new Node(data.val, new List<Node>());

        TreeNode curr = data.left;
        while (curr != null) {
            rootNode.children.Add(decode(curr));
            curr = curr.right;
        }

        return rootNode;
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

/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */

type Codec struct {
}

func Constructor() *Codec {
    return &Codec{}
}

func (this *Codec) encode(root *Node) *TreeNode {
    if root == nil {
        return nil
    }

    rootNode := &TreeNode{Val: root.Val}

    if len(root.Children) > 0 {
        firstChild := root.Children[0]
        rootNode.Left = this.encode(firstChild)
    }

    curr := rootNode.Left
    for i := 1; i < len(root.Children); i++ {
        curr.Right = this.encode(root.Children[i])
        curr = curr.Right
    }

    return rootNode
}

func (this *Codec) decode(data *TreeNode) *Node {
    if data == nil {
        return nil
    }

    rootNode := &Node{Val: data.Val, Children: []*Node{}}

    curr := data.Left
    for curr != nil {
        rootNode.Children = append(rootNode.Children, this.decode(curr))
        curr = curr.Right
    }

    return rootNode
}
```

```kotlin
/**
 * Definition for a Node.
 * class Node(var `val`: Int) {
 *     var children: List<Node?> = listOf()
 * }
 */

/**
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */

class Codec {
    // Encodes an n-ary tree to a binary tree.
    fun encode(root: Node?): TreeNode? {
        if (root == null) return null

        val rootNode = TreeNode(root.`val`)

        if (root.children.isNotEmpty()) {
            val firstChild = root.children[0]
            rootNode.left = encode(firstChild)
        }

        var curr = rootNode.left
        for (i in 1 until root.children.size) {
            curr?.right = encode(root.children[i])
            curr = curr?.right
        }

        return rootNode
    }

    // Decodes your binary tree to an n-ary tree.
    fun decode(data: TreeNode?): Node? {
        if (data == null) return null

        val rootNode = Node(data.`val`)
        val children = mutableListOf<Node?>()

        var curr = data.left
        while (curr != null) {
            children.add(decode(curr))
            curr = curr.right
        }

        rootNode.children = children
        return rootNode
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

/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     public var val: Int
 *     public var left: TreeNode?
 *     public var right: TreeNode?
 *     public init(_ val: Int) {
 *         self.val = val
 *         self.left = nil
 *         self.right = nil
 *     }
 * }
 */

class Codec {
    // Encodes an n-ary tree to a binary tree.
    func encode(_ root: Node?) -> TreeNode? {
        guard let root = root else { return nil }

        let rootNode = TreeNode(root.val)

        if !root.children.isEmpty {
            let firstChild = root.children[0]
            rootNode.left = encode(firstChild)
        }

        var curr = rootNode.left
        for i in 1..<root.children.count {
            curr?.right = encode(root.children[i])
            curr = curr?.right
        }

        return rootNode
    }

    // Decodes your binary tree to an n-ary tree.
    func decode(_ data: TreeNode?) -> Node? {
        guard let data = data else { return nil }

        let rootNode = Node(data.val)

        var curr = data.left
        while let c = curr {
            if let decoded = decode(c) {
                rootNode.children.append(decoded)
            }
            curr = c.right
        }

        return rootNode
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$

- Space complexity: $O(D)$
    - Since $D$ is proportional to $N$ in the worst case, we could further generalize the space complexity to $O(N)$

    - Unlike the BFS algorithm, we don't use the queue data structure in the DFS algorithm. However, implicitly the algorithm would consume more space in the function call stack due to the recursive function calls.

    - And this consumption of call stack space is the main space complexity for our DFS algorithm. As we can see, the size of the call stack at any moment is exactly the number of level where the currently visited node resides, e.g. for the root node (level 0), the recursive call stack is empty.

>  Where $N$ is the number of nodes in the N-ary tree, and $D$ is the depth of the N-ary tree.

---

## Common Pitfalls

### Confusing Left-Child and Right-Sibling Roles

In the encoding scheme, `left` points to the first child of the N-ary node, while `right` links siblings together. A common mistake is reversing these roles or using `right` for children, which breaks the bidirectional mapping and makes decoding impossible.

### Not Initializing the Children List

When decoding, the N-ary node's children list must be initialized as an empty list, not `null` or `None`. Many online judges expect an empty list for leaf nodes, and failing to initialize causes null pointer exceptions when appending children.

### Forgetting to Handle the Empty Tree Case

Both encode and decode must handle `null` input and return `null`. Forgetting this base case causes null pointer exceptions when the root is null, as the algorithm tries to access properties of a non-existent node.

### Incorrect Sibling Chain Traversal During Decode

When decoding, you must traverse the entire right-sibling chain starting from the left child. A common mistake is only processing the immediate left child without following the `right` pointers, which loses all siblings after the first child.
