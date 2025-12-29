## 1. BFS (Breadth-First Search) Traversal

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$

- Space complexity: $O(D)$
    - Since $D$ is proportional to $N$ in the worst case, we could further generalize the space complexity to $O(N)$

    - Unlike the BFS algorithm, we don't use the queue data structure in the DFS algorithm. However, implicitly the algorithm would consume more space in the function call stack due to the recursive function calls.

    - And this consumption of call stack space is the main space complexity for our DFS algorithm. As we can see, the size of the call stack at any moment is exactly the number of level where the currently visited node resides, e.g. for the root node (level 0), the recursive call stack is empty.

>  Where $N$ is the number of nodes in the N-ary tree, and $D$ is the depth of the N-ary tree.
