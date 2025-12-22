## 1. Depth First Seacrh

### Intuition
The graph may contain **cycles**, so we cannot simply copy nodes recursively without remembering what we’ve already copied.  
To handle this, we use a **map (old → new)**:

- When we first see a node, we create its copy.
- If we see the same node again, we reuse the already-created copy.
- This avoids infinite loops and ensures each node is cloned exactly once.

Depth First Search (DFS) helps us explore and clone all connected nodes.

---

### Algorithm
1. If the input node is `null`, return `null`.
2. Create a map to store original nodes → cloned nodes.
3. Start DFS from the given node:
   - If the node is already in the map, return its clone.
   - Create a new node with the same value.
   - Store it in the map.
   - Recursively clone all neighbors and add them to the clone’s neighbor list.
4. Return the cloned node corresponding to the starting node.

::tabs-start

```python
"""
# Definition for a Node.
class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []
"""

class Solution:
    def cloneGraph(self, node: Optional['Node']) -> Optional['Node']:
        oldToNew = {}

        def dfs(node):
            if node in oldToNew:
                return oldToNew[node]

            copy = Node(node.val)
            oldToNew[node] = copy
            for nei in node.neighbors:
                copy.neighbors.append(dfs(nei))
            return copy

        return dfs(node) if node else None
```

```java
/*
Definition for a Node.
class Node {
    public int val;
    public List<Node> neighbors;
    public Node() {
        val = 0;
        neighbors = new ArrayList<Node>();
    }
    public Node(int _val) {
        val = _val;
        neighbors = new ArrayList<Node>();
    }
    public Node(int _val, ArrayList<Node> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
}
*/

public class Solution {
    public Node cloneGraph(Node node) {
        Map<Node, Node> oldToNew = new HashMap<>();

        return dfs(node, oldToNew);
    }

    private Node dfs(Node node, Map<Node, Node> oldToNew) {
        if (node == null) {
            return null;
        }

        if (oldToNew.containsKey(node)) {
            return oldToNew.get(node);
        }

        Node copy = new Node(node.val);
        oldToNew.put(node, copy);

        for (Node nei : node.neighbors) {
            copy.neighbors.add(dfs(nei, oldToNew));
        }

        return copy;
    }
}
```

```cpp
/*
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> neighbors;
    Node() {
        val = 0;
        neighbors = vector<Node*>();
    }
    Node(int _val) {
        val = _val;
        neighbors = vector<Node*>();
    }
    Node(int _val, vector<Node*> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
};
*/

class Solution {
public:
    Node* cloneGraph(Node* node) {
        map<Node*, Node*> oldToNew;
        return dfs(node, oldToNew);
    }

    Node* dfs(Node* node, map<Node*, Node*>& oldToNew) {
        if (node == nullptr) {
            return nullptr;
        }

        if (oldToNew.count(node)) {
            return oldToNew[node];
        }

        Node* copy = new Node(node->val);
        oldToNew[node] = copy;

        for (Node* nei : node->neighbors) {
            copy->neighbors.push_back(dfs(nei, oldToNew));
        }

        return copy;
    }
};
```

```javascript
/**
 * // Definition for a Node.
 * class Node {
 *     constructor(val = 0, neighbors = []) {
 *       this.val = val;
 *       this.neighbors = neighbors;
 *     }
 * }
 */

class Solution {
    /**
     * @param {Node} node
     * @return {Node}
     */
    cloneGraph(node) {
        const oldToNew = new Map();
        return this.dfs(node, oldToNew);
    }

    /**
     * @param {Node} node
     * @param {Map} oldToNew
     * @return {Node}
     */
    dfs(node, oldToNew) {
        if (node === null) {
            return null;
        }

        if (oldToNew.has(node)) {
            return oldToNew.get(node);
        }

        const copy = new Node(node.val);
        oldToNew.set(node, copy);

        for (const nei of node.neighbors) {
            copy.neighbors.push(this.dfs(nei, oldToNew));
        }

        return copy;
    }
}
```

```csharp
/*
// Definition for a Node.
public class Node {
    public int val;
    public IList<Node> neighbors;

    public Node() {
        val = 0;
        neighbors = new List<Node>();
    }

    public Node(int _val) {
        val = _val;
        neighbors = new List<Node>();
    }

    public Node(int _val, List<Node> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
}
*/

public class Solution {
    public Node CloneGraph(Node node) {
        Dictionary<Node, Node> oldToNew = new Dictionary<Node, Node>();
        return Dfs(node, oldToNew);
    }

    private Node Dfs(Node node, Dictionary<Node, Node> oldToNew) {
        if (node == null)
            return null;

        if (oldToNew.ContainsKey(node))
            return oldToNew[node];

        Node copy = new Node(node.val);
        oldToNew[node] = copy;

        foreach (Node nei in node.neighbors)
            copy.neighbors.Add(Dfs(nei, oldToNew));

        return copy;
    }
}
```

```go
/**
 * Definition for a Node.
 * type Node struct {
 *     Val int
 *     Neighbors []*Node
 * }
 */

func cloneGraph(node *Node) *Node {
    oldToNew := make(map[*Node]*Node)

    var dfs func(*Node) *Node
    dfs = func(node *Node) *Node {
        if node == nil {
            return nil
        }

        if _, found := oldToNew[node]; found {
            return oldToNew[node]
        }

        copy := &Node{Val: node.Val}
        oldToNew[node] = copy
        for _, nei := range node.Neighbors {
            copy.Neighbors = append(copy.Neighbors, dfs(nei))
        }
        return copy
    }

    return dfs(node)
}
```

```kotlin
/**
 * Definition for a Node.
 * class Node(var `val`: Int) {
 *     var neighbors: ArrayList<Node?> = ArrayList<Node?>()
 * }
 */

class Solution {
    fun cloneGraph(node: Node?): Node? {
        if (node == null) return null

        val oldToNew = HashMap<Node, Node>()

        fun dfs(node: Node): Node {
            if (node in oldToNew) {
                return oldToNew[node]!!
            }

            val copy = Node(node.`val`)
            oldToNew[node] = copy

            for (nei in node.neighbors) {
                nei?.let { copy.neighbors.add(dfs(it)) }
            }

            return copy
        }

        return dfs(node)
    }
}
```

```swift
/**
 * Definition for a Node.
 * public class Node {
 *     public var val: Int
 *     public var neighbors: [Node?]
 *     public init(_ val: Int) {
 *         self.val = val
 *         self.neighbors = []
 *     }
 * }
 */

class Solution {
    func cloneGraph(_ node: Node?) -> Node? {
        var oldToNew = [Node: Node]()

        func dfs(_ node: Node?) -> Node? {
            guard let node = node else { return nil }

            if let existingCopy = oldToNew[node] {
                return existingCopy
            }

            let copy = Node(node.val)
            oldToNew[node] = copy

            for neighbor in node.neighbors {
                if let clonedNeighbor = dfs(neighbor) {
                    copy.neighbors.append(clonedNeighbor)
                }
            }

            return copy
        }

        return dfs(node)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V)$

> Where $V$ is the number of vertices and $E$ is the number of edges.

---

## 2. Breadth First Search

### Intuition
The graph can have **cycles**, so while cloning we must avoid creating duplicate nodes or looping forever.  
Using **Breadth First Search (BFS)**, we explore the graph level by level and keep a **map from original nodes to their clones**.

- When a node is first seen, create its clone and store it in the map.
- For every neighbor, ensure its clone exists, then connect the cloned nodes.
- The map guarantees each node is cloned only once.

---

### Algorithm
1. If the input node is `null`, return `null`.
2. Create a map to store original node → cloned node.
3. Initialize a queue with the starting node and create its clone.
4. While the queue is not empty:
   - Pop a node.
   - For each of its neighbors:
     - If the neighbor is not cloned yet, clone it and add it to the queue.
     - Add the cloned neighbor to the current node’s clone neighbor list.
5. Return the cloned version of the starting node.

::tabs-start

```python
"""
# Definition for a Node.
class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []
"""

class Solution:
    def cloneGraph(self, node: Optional['Node']) -> Optional['Node']:
        if not node:
            return None

        oldToNew = {}
        oldToNew[node] = Node(node.val)
        q = deque([node])

        while q:
            cur = q.popleft()
            for nei in cur.neighbors:
                if nei not in oldToNew:
                    oldToNew[nei] = Node(nei.val)
                    q.append(nei)
                oldToNew[cur].neighbors.append(oldToNew[nei])

        return oldToNew[node]
```

```java
/*
Definition for a Node.
class Node {
    public int val;
    public List<Node> neighbors;
    public Node() {
        val = 0;
        neighbors = new ArrayList<Node>();
    }
    public Node(int _val) {
        val = _val;
        neighbors = new ArrayList<Node>();
    }
    public Node(int _val, ArrayList<Node> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
}
*/

public class Solution {
    public Node cloneGraph(Node node) {
        if (node == null) return null;
        Map<Node, Node> oldToNew = new HashMap<>();
        Queue<Node> q = new LinkedList<>();
        oldToNew.put(node, new Node(node.val));
        q.add(node);

        while (!q.isEmpty()) {
            Node cur = q.poll();
            for (Node nei : cur.neighbors) {
                if (!oldToNew.containsKey(nei)) {
                    oldToNew.put(nei, new Node(nei.val));
                    q.add(nei);
                }
                oldToNew.get(cur).neighbors.add(oldToNew.get(nei));
            }
        }
        return oldToNew.get(node);
    }
}
```

```cpp
/*
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> neighbors;
    Node() {
        val = 0;
        neighbors = vector<Node*>();
    }
    Node(int _val) {
        val = _val;
        neighbors = vector<Node*>();
    }
    Node(int _val, vector<Node*> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
};
*/

class Solution {
public:
    Node* cloneGraph(Node* node) {
        if (!node) return nullptr;
        unordered_map<Node*, Node*> oldToNew;
        queue<Node*> q;
        oldToNew[node] = new Node(node->val);
        q.push(node);

        while (!q.empty()) {
            Node* cur = q.front();
            q.pop();
            for (Node* nei : cur->neighbors) {
                if (oldToNew.find(nei) == oldToNew.end()) {
                    oldToNew[nei] = new Node(nei->val);
                    q.push(nei);
                }
                oldToNew[cur]->neighbors.push_back(oldToNew[nei]);
            }
        }
        return oldToNew[node];
    }
};
```

```javascript
/**
 * // Definition for a Node.
 * class Node {
 *     constructor(val = 0, neighbors = []) {
 *       this.val = val;
 *       this.neighbors = neighbors;
 *     }
 * }
 */

class Solution {
    /**
     * @param {Node} node
     * @return {Node}
     */
    cloneGraph(node) {
        if (!node) return null;
        const oldToNew = new Map();
        const q = new Queue();
        oldToNew.set(node, new Node(node.val));
        q.push(node);

        while (!q.isEmpty()) {
            const cur = q.pop();
            for (const nei of cur.neighbors) {
                if (!oldToNew.has(nei)) {
                    oldToNew.set(nei, new Node(nei.val));
                    q.push(nei);
                }
                oldToNew.get(cur).neighbors.push(oldToNew.get(nei));
            }
        }
        return oldToNew.get(node);
    }
}
```

```csharp
/*
// Definition for a Node.
public class Node {
    public int val;
    public IList<Node> neighbors;

    public Node() {
        val = 0;
        neighbors = new List<Node>();
    }

    public Node(int _val) {
        val = _val;
        neighbors = new List<Node>();
    }

    public Node(int _val, List<Node> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
}
*/

public class Solution {
    public Node CloneGraph(Node node) {
        if (node == null) return null;
        var oldToNew = new Dictionary<Node, Node>();
        var q = new Queue<Node>();
        oldToNew[node] = new Node(node.val);
        q.Enqueue(node);

        while (q.Count > 0) {
            var cur = q.Dequeue();
            foreach (var nei in cur.neighbors) {
                if (!oldToNew.ContainsKey(nei)) {
                    oldToNew[nei] = new Node(nei.val);
                    q.Enqueue(nei);
                }
                oldToNew[cur].neighbors.Add(oldToNew[nei]);
            }
        }
        return oldToNew[node];
    }
}
```

```go
/**
 * Definition for a Node.
 * type Node struct {
 *     Val int
 *     Neighbors []*Node
 * }
 */

func cloneGraph(node *Node) *Node {
    if node == nil {
        return nil
    }

    oldToNew := make(map[*Node]*Node)
    oldToNew[node] = &Node{Val: node.Val, Neighbors: make([]*Node, 0)}
    queue := make([]*Node, 0)
    queue = append(queue, node)

    for len(queue) > 0 {
        cur := queue[0]
        queue = queue[1:]

        for _, nei := range cur.Neighbors {
            if _, exists := oldToNew[nei]; !exists {
                oldToNew[nei] = &Node{Val: nei.Val, Neighbors: make([]*Node, 0)}
                queue = append(queue, nei)
            }
            oldToNew[cur].Neighbors = append(oldToNew[cur].Neighbors, oldToNew[nei])
        }
    }

    return oldToNew[node]
}
```

```kotlin
/**
 * Definition for a Node.
 * class Node(var `val`: Int) {
 *     var neighbors: ArrayList<Node?> = ArrayList<Node?>()
 * }
 */

class Solution {
    fun cloneGraph(node: Node?): Node? {
        if (node == null) return null

        val oldToNew = HashMap<Node, Node>()
        oldToNew[node] = Node(node.`val`)
        val queue = ArrayDeque<Node>()
        queue.add(node)

        while (queue.isNotEmpty()) {
            val cur = queue.removeFirst()

            for (nei in cur.neighbors) {
                nei?.let { neighbor ->
                    if (neighbor !in oldToNew) {
                        oldToNew[neighbor] = Node(neighbor.`val`)
                        queue.add(neighbor)
                    }
                    oldToNew[cur]?.neighbors?.add(oldToNew[neighbor])
                }
            }
        }

        return oldToNew[node]
    }
}
```

```swift
/**
 * Definition for a Node.
 * public class Node {
 *     public var val: Int
 *     public var neighbors: [Node?]
 *     public init(_ val: Int) {
 *         self.val = val
 *         self.neighbors = []
 *     }
 * }
 */

class Solution {
    func cloneGraph(_ node: Node?) -> Node? {
        if node == nil {
            return nil
        }

        var oldToNew: [Node: Node] = [:]
        let newNode = Node(node!.val)
        oldToNew[node!] = newNode
        var queue = Deque<Node>()
        queue.append(node!)

        while !queue.isEmpty {
            let cur = queue.popFirst()!
            for nei in cur.neighbors {
                if let nei = nei {
                    if oldToNew[nei] == nil {
                        oldToNew[nei] = Node(nei.val)
                        queue.append(nei)
                    }
                    oldToNew[cur]!.neighbors.append(oldToNew[nei]!)
                }
            }
        }

        return oldToNew[node!]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V)$

> Where $V$ is the number of vertices and $E$ is the number of edges.
