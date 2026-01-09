## 1. Breadth First Search

::tabs-start

```python
"""
# Definition for a Node.
class Node:
    def __init__(self, val: int = 0, left: 'Node' = None, right: 'Node' = None, next: 'Node' = None):
        self.val = val
        self.left = left
        self.right = right
        self.next = next
"""

class Solution:
    def connect(self, root: 'Optional[Node]') -> 'Optional[Node]':
        if not root:
            return None

        q = deque([root])
        while q:
            levelSize = len(q)
            while levelSize:
                node = q.popleft()
                if levelSize > 1:
                    node.next = q[0]
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
                levelSize -= 1

        return root
```

```java
/*
// Definition for a Node.
class Node {
    public int val;
    public Node left;
    public Node right;
    public Node next;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, Node _left, Node _right, Node _next) {
        val = _val;
        left = _left;
        right = _right;
        next = _next;
    }
};
*/

public class Solution {
    public Node connect(Node root) {
        if (root == null) return null;

        Queue<Node> q = new LinkedList<>();
        q.add(root);

        while (!q.isEmpty()) {
            int levelSize = q.size();
            while (levelSize > 0) {
                Node node = q.poll();
                if (levelSize > 1) {
                    node.next = q.peek();
                }
                if (node.left != null) {
                    q.add(node.left);
                }
                if (node.right != null) {
                    q.add(node.right);
                }
                levelSize--;
            }
        }

        return root;
    }
}
```

```cpp
/*
// Definition for a Node.
class Node {
public:
    int val;
    Node* left;
    Node* right;
    Node* next;

    Node() : val(0), left(NULL), right(NULL), next(NULL) {}

    Node(int _val) : val(_val), left(NULL), right(NULL), next(NULL) {}

    Node(int _val, Node* _left, Node* _right, Node* _next)
        : val(_val), left(_left), right(_right), next(_next) {}
};
*/

class Solution {
public:
    Node* connect(Node* root) {
        if (!root) return nullptr;

        queue<Node*> q;
        q.push(root);

        while (!q.empty()) {
            int levelSize = q.size();
            while (levelSize > 0) {
                Node* node = q.front();
                q.pop();
                if (levelSize > 1) {
                    node->next = q.front();
                }
                if (node->left) {
                    q.push(node->left);
                }
                if (node->right) {
                    q.push(node->right);
                }
                levelSize--;
            }
        }

        return root;
    }
};
```

```javascript
/**
 * Definition for a binary tree node.
 * class Node {
 *     constructor(val = 0, left = null, right = null, next = null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *         this.next = next;
 *     }
 * }
 */

class Solution {
    /**
     * @param {Node} root
     * @return {Node}
     */
    connect(root) {
        if (!root) return null;

        const q = new Queue();
        q.push(root);

        while (!q.isEmpty()) {
            let levelSize = q.size();
            while (levelSize > 0) {
                let node = q.pop();
                if (levelSize > 1) {
                    node.next = q.front();
                }
                if (node.left) {
                    q.push(node.left);
                }
                if (node.right) {
                    q.push(node.right);
                }
                levelSize--;
            }
        }

        return root;
    }
}
```

```csharp
/*
// Definition for a Node.
public class Node {
    public int val;
    public Node left;
    public Node right;
    public Node next;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, Node _left, Node _right, Node _next) {
        val = _val;
        left = _left;
        right = _right;
        next = _next;
    }
}
*/

public class Solution {
    public Node Connect(Node root) {
        if (root == null) return null;

        Queue<Node> q = new Queue<Node>();
        q.Enqueue(root);

        while (q.Count > 0) {
            int levelSize = q.Count;
            while (levelSize > 0) {
                Node node = q.Dequeue();
                if (levelSize > 1) {
                    node.next = q.Peek();
                }
                if (node.left != null) q.Enqueue(node.left);
                if (node.right != null) q.Enqueue(node.right);
                levelSize--;
            }
        }

        return root;
    }
}
```

```go
func connect(root *Node) *Node {
    if root == nil {
        return nil
    }

    q := []*Node{root}

    for len(q) > 0 {
        levelSize := len(q)
        for i := 0; i < levelSize; i++ {
            node := q[0]
            q = q[1:]
            if i < levelSize-1 {
                node.Next = q[0]
            }
            if node.Left != nil {
                q = append(q, node.Left)
            }
            if node.Right != nil {
                q = append(q, node.Right)
            }
        }
    }

    return root
}
```

```kotlin
class Solution {
    fun connect(root: Node?): Node? {
        if (root == null) return null

        val q: Queue<Node> = LinkedList()
        q.offer(root)

        while (q.isNotEmpty()) {
            val levelSize = q.size
            for (i in 0 until levelSize) {
                val node = q.poll()
                if (i < levelSize - 1) {
                    node.next = q.peek()
                }
                node.left?.let { q.offer(it) }
                node.right?.let { q.offer(it) }
            }
        }

        return root
    }
}
```

```swift
class Solution {
    func connect(_ root: Node?) -> Node? {
        guard let root = root else { return nil }

        var queue = [Node]()
        queue.append(root)

        while !queue.isEmpty {
            let levelSize = queue.count
            for i in 0..<levelSize {
                let node = queue.removeFirst()
                if i < levelSize - 1 {
                    node.next = queue.first
                }
                if let left = node.left {
                    queue.append(left)
                }
                if let right = node.right {
                    queue.append(right)
                }
            }
        }

        return root
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(\log n)$

---

## 2. Depth First Search

::tabs-start

```python
"""
# Definition for a Node.
class Node:
    def __init__(self, val: int = 0, left: 'Node' = None, right: 'Node' = None, next: 'Node' = None):
        self.val = val
        self.left = left
        self.right = right
        self.next = next
"""

class Solution:
    def connect(self, root: 'Optional[Node]') -> 'Optional[Node]':
        mp = {}

        def dfs(node, depth):
            if not node:
                return

            if depth not in mp:
                mp[depth] = node
            else:
                mp[depth].next = node
                mp[depth] = node

            dfs(node.left, depth + 1)
            dfs(node.right, depth + 1)

        dfs(root, 0)
        return root
```

```java
/*
// Definition for a Node.
class Node {
    public int val;
    public Node left;
    public Node right;
    public Node next;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, Node _left, Node _right, Node _next) {
        val = _val;
        left = _left;
        right = _right;
        next = _next;
    }
};
*/

public class Solution {
    public Node connect(Node root) {
        Map<Integer, Node> mp = new HashMap<>();
        dfs(root, 0, mp);
        return root;
    }

    private void dfs(Node node, int depth, Map<Integer, Node> mp) {
        if (node == null) return;

        if (!mp.containsKey(depth)) {
            mp.put(depth, node);
        } else {
            mp.get(depth).next = node;
            mp.put(depth, node);
        }

        dfs(node.left, depth + 1, mp);
        dfs(node.right, depth + 1, mp);
    }
}
```

```cpp
/*
// Definition for a Node.
class Node {
public:
    int val;
    Node* left;
    Node* right;
    Node* next;

    Node() : val(0), left(NULL), right(NULL), next(NULL) {}

    Node(int _val) : val(_val), left(NULL), right(NULL), next(NULL) {}

    Node(int _val, Node* _left, Node* _right, Node* _next)
        : val(_val), left(_left), right(_right), next(_next) {}
};
*/

class Solution {
public:
    Node* connect(Node* root) {
        unordered_map<int, Node*> mp;
        dfs(root, 0, mp);
        return root;
    }

private:
    void dfs(Node* node, int depth, unordered_map<int, Node*>& mp) {
        if (!node) return;

        if (mp.find(depth) == mp.end()) {
            mp[depth] = node;
        } else {
            mp[depth]->next = node;
            mp[depth] = node;
        }

        dfs(node->left, depth + 1, mp);
        dfs(node->right, depth + 1, mp);
    }
};
```

```javascript
/**
 * Definition for a binary tree node.
 * class Node {
 *     constructor(val = 0, left = null, right = null, next = null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *         this.next = next;
 *     }
 * }
 */

class Solution {
    /**
     * @param {Node} root
     * @return {Node}
     */
    connect(root) {
        let mp = new Map();

        const dfs = (node, depth) => {
            if (!node) return;

            if (!mp.has(depth)) {
                mp.set(depth, node);
            } else {
                mp.get(depth).next = node;
                mp.set(depth, node);
            }

            dfs(node.left, depth + 1);
            dfs(node.right, depth + 1);
        };

        dfs(root, 0);
        return root;
    }
}
```

```csharp
/*
// Definition for a Node.
public class Node {
    public int val;
    public Node left;
    public Node right;
    public Node next;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, Node _left, Node _right, Node _next) {
        val = _val;
        left = _left;
        right = _right;
        next = _next;
    }
}
*/

public class Solution {
    public Node Connect(Node root) {
        Dictionary<int, Node> mp = new Dictionary<int, Node>();

        void Dfs(Node node, int depth) {
            if (node == null) return;

            if (!mp.ContainsKey(depth)) {
                mp[depth] = node;
            } else {
                mp[depth].next = node;
                mp[depth] = node;
            }

            Dfs(node.left, depth + 1);
            Dfs(node.right, depth + 1);
        }

        Dfs(root, 0);
        return root;
    }
}
```

```go
func connect(root *Node) *Node {
    mp := make(map[int]*Node)

    var dfs func(node *Node, depth int)
    dfs = func(node *Node, depth int) {
        if node == nil {
            return
        }

        if _, exists := mp[depth]; !exists {
            mp[depth] = node
        } else {
            mp[depth].Next = node
            mp[depth] = node
        }

        dfs(node.Left, depth+1)
        dfs(node.Right, depth+1)
    }

    dfs(root, 0)
    return root
}
```

```kotlin
class Solution {
    fun connect(root: Node?): Node? {
        val mp = HashMap<Int, Node>()

        fun dfs(node: Node?, depth: Int) {
            if (node == null) return

            if (!mp.containsKey(depth)) {
                mp[depth] = node
            } else {
                mp[depth]!!.next = node
                mp[depth] = node
            }

            dfs(node.left, depth + 1)
            dfs(node.right, depth + 1)
        }

        dfs(root, 0)
        return root
    }
}
```

```swift
class Solution {
    func connect(_ root: Node?) -> Node? {
        var mp = [Int: Node]()

        func dfs(_ node: Node?, _ depth: Int) {
            guard let node = node else { return }

            if mp[depth] == nil {
                mp[depth] = node
            } else {
                mp[depth]!.next = node
                mp[depth] = node
            }

            dfs(node.left, depth + 1)
            dfs(node.right, depth + 1)
        }

        dfs(root, 0)
        return root
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(\log n)$

---

## 3. Depth First Search (Optimal)

::tabs-start

```python
"""
# Definition for a Node.
class Node:
    def __init__(self, val: int = 0, left: 'Node' = None, right: 'Node' = None, next: 'Node' = None):
        self.val = val
        self.left = left
        self.right = right
        self.next = next
"""

class Solution:
    def connect(self, root: 'Optional[Node]') -> 'Optional[Node]':
        if not root:
            return root

        if root.left:
            root.left.next = root.right
            if root.next:
                root.right.next = root.next.left

            self.connect(root.left)
            self.connect(root.right)

        return root
```

```java
/*
// Definition for a Node.
class Node {
    public int val;
    public Node left;
    public Node right;
    public Node next;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, Node _left, Node _right, Node _next) {
        val = _val;
        left = _left;
        right = _right;
        next = _next;
    }
};
*/

public class Solution {
    public Node connect(Node root) {
        if (root == null) return root;

        if (root.left != null) {
            root.left.next = root.right;
            if (root.next != null) {
                root.right.next = root.next.left;
            }

            connect(root.left);
            connect(root.right);
        }

        return root;
    }
}
```

```cpp
/*
// Definition for a Node.
class Node {
public:
    int val;
    Node* left;
    Node* right;
    Node* next;

    Node() : val(0), left(NULL), right(NULL), next(NULL) {}

    Node(int _val) : val(_val), left(NULL), right(NULL), next(NULL) {}

    Node(int _val, Node* _left, Node* _right, Node* _next)
        : val(_val), left(_left), right(_right), next(_next) {}
};
*/

class Solution {
public:
    Node* connect(Node* root) {
        if (!root) return root;

        if (root->left) {
            root->left->next = root->right;
            if (root->next) {
                root->right->next = root->next->left;
            }

            connect(root->left);
            connect(root->right);
        }

        return root;
    }
};
```

```javascript
/**
 * Definition for a binary tree node.
 * class Node {
 *     constructor(val = 0, left = null, right = null, next = null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *         this.next = next;
 *     }
 * }
 */

class Solution {
    /**
     * @param {Node} root
     * @return {Node}
     */
    connect(root) {
        if (!root) return root;

        if (root.left) {
            root.left.next = root.right;
            if (root.next) {
                root.right.next = root.next.left;
            }

            this.connect(root.left);
            this.connect(root.right);
        }

        return root;
    }
}
```

```csharp
/*
// Definition for a Node.
public class Node {
    public int val;
    public Node left;
    public Node right;
    public Node next;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, Node _left, Node _right, Node _next) {
        val = _val;
        left = _left;
        right = _right;
        next = _next;
    }
}
*/

public class Solution {
    public Node Connect(Node root) {
        if (root == null) return root;

        if (root.left != null) {
            root.left.next = root.right;
            if (root.next != null) {
                root.right.next = root.next.left;
            }
            Connect(root.left);
            Connect(root.right);
        }

        return root;
    }
}
```

```go
func connect(root *Node) *Node {
    if root == nil {
        return root
    }

    if root.Left != nil {
        root.Left.Next = root.Right
        if root.Next != nil {
            root.Right.Next = root.Next.Left
        }

        connect(root.Left)
        connect(root.Right)
    }

    return root
}
```

```kotlin
class Solution {
    fun connect(root: Node?): Node? {
        if (root == null) return root

        root.left?.let {
            it.next = root.right
            root.next?.let { next ->
                root.right?.next = next.left
            }

            connect(root.left)
            connect(root.right)
        }

        return root
    }
}
```

```swift
class Solution {
    func connect(_ root: Node?) -> Node? {
        guard let root = root else { return nil }

        if let left = root.left {
            left.next = root.right
            if let next = root.next {
                root.right?.next = next.left
            }

            connect(root.left)
            connect(root.right)
        }

        return root
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(\log n)$ for the recursion stack.

---

## 4. Breadth First Search (Optimal)

::tabs-start

```python
"""
# Definition for a Node.
class Node:
    def __init__(self, val: int = 0, left: 'Node' = None, right: 'Node' = None, next: 'Node' = None):
        self.val = val
        self.left = left
        self.right = right
        self.next = next
"""

class Solution:
    def connect(self, root: 'Optional[Node]') -> 'Optional[Node]':
        cur, nxt = root, root.left if root else None

        while cur and nxt:
            cur.left.next = cur.right
            if cur.next:
                cur.right.next = cur.next.left

            cur = cur.next
            if not cur:
                cur = nxt
                nxt = cur.left

        return root
```

```java
/*
// Definition for a Node.
class Node {
    public int val;
    public Node left;
    public Node right;
    public Node next;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, Node _left, Node _right, Node _next) {
        val = _val;
        left = _left;
        right = _right;
        next = _next;
    }
};
*/

public class Solution {
    public Node connect(Node root) {
        if (root == null) return null;

        Node cur = root, nxt = root.left;

        while (cur != null && nxt != null) {
            cur.left.next = cur.right;
            if (cur.next != null) {
                cur.right.next = cur.next.left;
            }

            cur = cur.next;
            if (cur == null) {
                cur = nxt;
                nxt = cur.left;
            }
        }

        return root;
    }
}
```

```cpp
/*
// Definition for a Node.
class Node {
public:
    int val;
    Node* left;
    Node* right;
    Node* next;

    Node() : val(0), left(NULL), right(NULL), next(NULL) {}

    Node(int _val) : val(_val), left(NULL), right(NULL), next(NULL) {}

    Node(int _val, Node* _left, Node* _right, Node* _next)
        : val(_val), left(_left), right(_right), next(_next) {}
};
*/

class Solution {
public:
    Node* connect(Node* root) {
        if (!root) return nullptr;

        Node* cur = root, *nxt = root->left;

        while (cur && nxt) {
            cur->left->next = cur->right;
            if (cur->next) {
                cur->right->next = cur->next->left;
            }

            cur = cur->next;
            if (!cur) {
                cur = nxt;
                nxt = cur->left;
            }
        }

        return root;
    }
};
```

```javascript
/**
 * Definition for a binary tree node.
 * class Node {
 *     constructor(val = 0, left = null, right = null, next = null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *         this.next = next;
 *     }
 * }
 */

class Solution {
    /**
     * @param {Node} root
     * @return {Node}
     */
    connect(root) {
        if (!root) return null;

        let cur = root,
            nxt = root.left;

        while (cur && nxt) {
            cur.left.next = cur.right;
            if (cur.next) {
                cur.right.next = cur.next.left;
            }

            cur = cur.next;
            if (!cur) {
                cur = nxt;
                nxt = cur.left;
            }
        }

        return root;
    }
}
```

```csharp
/*
// Definition for a Node.
public class Node {
    public int val;
    public Node left;
    public Node right;
    public Node next;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, Node _left, Node _right, Node _next) {
        val = _val;
        left = _left;
        right = _right;
        next = _next;
    }
}
*/

public class Solution {
    public Node Connect(Node root) {
        Node cur = root;
        Node nxt = root != null ? root.left : null;

        while (cur != null && nxt != null) {
            cur.left.next = cur.right;
            if (cur.next != null) {
                cur.right.next = cur.next.left;
            }

            cur = cur.next;
            if (cur == null) {
                cur = nxt;
                nxt = cur.left;
            }
        }

        return root;
    }
}
```

```go
func connect(root *Node) *Node {
    if root == nil {
        return nil
    }

    cur := root
    nxt := root.Left

    for cur != nil && nxt != nil {
        cur.Left.Next = cur.Right
        if cur.Next != nil {
            cur.Right.Next = cur.Next.Left
        }

        cur = cur.Next
        if cur == nil {
            cur = nxt
            nxt = cur.Left
        }
    }

    return root
}
```

```kotlin
class Solution {
    fun connect(root: Node?): Node? {
        if (root == null) return null

        var cur: Node? = root
        var nxt: Node? = root.left

        while (cur != null && nxt != null) {
            cur.left?.next = cur.right
            cur.next?.let {
                cur.right?.next = it.left
            }

            cur = cur.next
            if (cur == null) {
                cur = nxt
                nxt = cur?.left
            }
        }

        return root
    }
}
```

```swift
class Solution {
    func connect(_ root: Node?) -> Node? {
        guard let root = root else { return nil }

        var cur: Node? = root
        var nxt: Node? = root.left

        while cur != nil && nxt != nil {
            cur?.left?.next = cur?.right
            if let next = cur?.next {
                cur?.right?.next = next.left
            }

            cur = cur?.next
            if cur == nil {
                cur = nxt
                nxt = cur?.left
            }
        }

        return root
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
