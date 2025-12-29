## 1. Parent Child relationships

::tabs-start

```python
class WrappableInt:
        def __init__(self, x):
            self.value = x
        def getValue(self):
            return self.value
        def increment(self):
            self.value += 1

class Codec:
    
    def serialize(self, root: 'Node') -> str:
        serializedList = []
        self._serializeHelper(root, serializedList, WrappableInt(1), None)
        return "".join(serializedList)
    
    def _serializeHelper(self, root, serializedList, identity, parentId):
        if not root:
            return
        
        # Own identity
        serializedList.append(chr(identity.getValue() + 48))
        
        # Actual value
        serializedList.append(chr(root.val + 48))
        
        # Parent's identity
        serializedList.append(chr(parentId + 48) if parentId else 'N')
        
        parentId = identity.getValue()
        for child in root.children:
            identity.increment()
            self._serializeHelper(child, serializedList, identity, parentId)
    
    def deserialize(self, data: str) -> 'Node': 
        if not data:
            return None
        
        return self._deserializeHelper(data)
        
    def _deserializeHelper(self, data):
        
        nodesAndParents = {}
        for i in range(0, len(data), 3):
            identity = ord(data[i]) - 48
            orgValue = ord(data[i + 1]) - 48
            parentId = ord(data[i + 2]) - 48
            nodesAndParents[identity] = (parentId, Node(orgValue, []))
            
        for i in range(3, len(data), 3):
            
            # Current node
            identity = ord(data[i]) - 48
            node = nodesAndParents[identity][1]
            
            # Parent node
            parentId = ord(data[i + 2]) - 48
            parentNode = nodesAndParents[parentId][1]
            
            # Attach!
            parentNode.children.append(node)
            
        return nodesAndParents[ord(data[0]) - 48][1]    
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - `Serialization` : $O(N)$. For every node, we add 3 different values to the final string and every node is processed exactly once.

    - `Deserialization` : $O(N)$. Technically, it is $3N$ for the first for loop and $N$ for the second one. However, constants are ignored in asymptotic complexity analysis. So, the overall time complexity for deserialization is $O(N)$.

- Space complexity: 
    - `Serialization` : $O(N)$. The space occupied by the serialization helper function is through recursion stack and the final string that is produced. Usually, we don't take into consideration the space of the output. However, in this case, the output is something which is not fixed. For all we know, someone might be able to generate a string of size $N/2$. We don't know! So, the size of the final string is a part of the space complexity here. Overall, the space is $4N = O(N)$.

    - `Deserialization` : $O(N)$. The space occupied by the deserialization helper function is through the hash map. For each entry, we have 3 values. Thus, we can say the space is $3N$. But again, the constants don't really matter in asymptotic complexity. So, the overall space is $O(N)$.

>  Where $N$ is the number of nodes in the tree.

---

## 2. Depth First Search with Children Sizes

::tabs-start

```python
class WrappableInt:
        def __init__(self, x):
            self.value = x
        def getValue(self):
            return self.value
        def increment(self):
            self.value += 1

class Codec:
    
    def serialize(self, root: 'Node') -> str:
        serializedList = []
        self._serializeHelper(root, serializedList)

        return "".join(serializedList)
    
    def _serializeHelper(self, root, serializedList):
        if not root:
            return
        
        # Actual value
        serializedList.append(chr(root.val + 48))
        
        # Number of children
        serializedList.append(chr(len(root.children) + 48))
        
        for child in root.children:
            self._serializeHelper(child, serializedList)
    
    def deserialize(self, data: str) -> 'Node':
        if not data:
            return None
        
        return self._deserializeHelper(data, WrappableInt(0))
        
    def _deserializeHelper(self, data, index):
        
        if index.getValue() == len(data):
            return None
        
        # The invariant here is that the "index" always
        # points to a node and the value next to it 
        # represents the number of children it has.
        node = Node(ord(data[index.getValue()]) - 48, [])
        index.increment()
        numChildren = ord(data[index.getValue()]) - 48
        for _ in range(numChildren):
            index.increment()
            node.children.append(self._deserializeHelper(data, index))

        return node
```

```java
class Codec {

    class WrappableInt {
        private int value;
        public WrappableInt(int x) {
            this.value = x;
        }
        public int getValue() {
            return this.value;
        }
        public void increment() {
            this.value++;
        }
    }
    
    public String serialize(Node root) {
        
        StringBuilder sb = new StringBuilder();
        this._serializeHelper(root, sb);
        return sb.toString();
    }
    
    private void _serializeHelper(Node root, StringBuilder sb) {
        
        if (root == null) {
            return;
        }
        
        // Add the value of the node
        sb.append((char) (root.val + '0'));
        
        // Add the number of children
        sb.append((char) (root.children.size() + '0'));
        
        // Recurse on the subtrees and build the 
        // string accordingly
        for (Node child : root.children) {
            this._serializeHelper(child, sb);
        }
    }

    public Node deserialize(String data) {
        if(data.isEmpty())
            return null;
        
        return this._deserializeHelper(data, new WrappableInt(0));
    }
    
    private Node _deserializeHelper(String data, WrappableInt index) {  
        
        if (index.getValue() == data.length()) {
            return null;
        }
        
        // The invariant here is that the "index" always
        // points to a node and the value next to it 
        // represents the number of children it has.
        Node node = new Node(data.charAt(index.getValue()) - '0', new ArrayList<Node>());
        index.increment();
        int numChildren = data.charAt(index.getValue()) - '0';
        for (int i = 0; i < numChildren; i++) {
            index.increment();
            node.children.add(this._deserializeHelper(data, index));
        }
        
        return node;
    }
}
```

```cpp
class Codec {
private:
    class WrappableInt {
    private:
        int value;
    
    public:
        WrappableInt(int x) : value(x) {}
        
        int getValue() const {
            return this->value;
        }
        
        void increment() {
            this->value++;
        }
    };
    
    void _serializeHelper(Node* root, string& sb) {
        if (root == nullptr) {
            return;
        }
        
        // Add the value of the node
        sb += (char)(root->val + '0');
        
        // Add the number of children
        sb += (char)(root->children.size() + '0');
        
        // Recurse on the subtrees and build the 
        // string accordingly
        for (Node* child : root->children) {
            this->_serializeHelper(child, sb);
        }
    }
    
    Node* _deserializeHelper(const string& data, WrappableInt& index) {
        if (index.getValue() == data.length()) {
            return nullptr;
        }
        
        // The invariant here is that the "index" always
        // points to a node and the value next to it 
        // represents the number of children it has.
        Node* node = new Node(data[index.getValue()] - '0', vector<Node*>());
        index.increment();
        
        int numChildren = data[index.getValue()] - '0';
        for (int i = 0; i < numChildren; i++) {
            index.increment();
            node->children.push_back(this->_deserializeHelper(data, index));
        }
        
        return node;
    }
    
public:
    string serialize(Node* root) {
        string sb;
        this->_serializeHelper(root, sb);
        
        return sb;
    }
    
    Node* deserialize(string data) {
        if (data.empty()) {
            return nullptr;
        }
        
        WrappableInt index(0);
        return this->_deserializeHelper(data, index);
    }
};
```

```javascript
class Codec {
    constructor() {
    }
    
    /** 
     * @param {_Node|null} root
     * @return {string}
     */
    serialize = function(root) {
        const serializedList = [];
        this._serializeHelper(root, serializedList);
        return serializedList.join("");
    };
    
    _serializeHelper = function(root, serializedList) {
        if (!root) {
            return;
        }
        
        // Actual value
        serializedList.push(String.fromCharCode(root.val + 48));
        
        // Number of children
        serializedList.push(String.fromCharCode(root.children.length + 48));
        
        for (const child of root.children) {
            this._serializeHelper(child, serializedList);
        }
    };
    
    /** 
     * @param {string} data 
     * @return {_Node|null}
     */
    deserialize = function(data) {
        if (!data) {
            return null;
        }
        
        const index = { value: 0 };
        return this._deserializeHelper(data, index);
    };
    
    _deserializeHelper = function(data, index) {
        if (index.value === data.length) {
            return null;
        }
        
        // The invariant here is that the "index" always
        // points to a node and the value next to it 
        // represents the number of children it has.
        const node = new _Node(data.charCodeAt(index.value) - 48, []);
        index.value++;
        
        const numChildren = data.charCodeAt(index.value) - 48;
        for (let i = 0; i < numChildren; i++) {
            index.value++;
            node.children.push(this._deserializeHelper(data, index));
        }
        
        return node;
    };
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - `Serialization` : $O(N)$. For every node, we add 2 different values to the final string and every node is processed exactly once.

    - `Deserialization` : $O(N)$. For deserialization, we process the entire string, one character at a time and also construct the tree along the way. So, the overall time complexity for deserialization is $2N = O(N)$.

- Space complexity: 
    - `Serialization` : $O(N)$. The space occupied by the serialization helper function is through recursion stack and the final string that is produced. We know the size of the final string to be $2N$. So, that is one part of the space complexity. The other part is the one occupied by the recursion stack which is $O(N)$. Overall, the space is $O(N)$.

    - `Deserialization` : $O(N)$. For deserialization, the space occupied is by the recursion stack only. We don't use any other intermediate data structures like we did in the previous approach and simply rely on the information in the string and recursion to work it's magic. So, the space complexity would be $O(N)$ since this is not a `balanced` tree of any sort. It's not even binary.

>  Where $N$ is the number of nodes in the tree.

---

## 3. Depth First Search with a Sentinel

::tabs-start

```python
class WrappableInt:
        def __init__(self, x):
            self.value = x
        def getValue(self):
            return self.value
        def increment(self):
            self.value += 1

class Codec:
    
    def serialize(self, root: 'Node') -> str:
        serializedList = []
        self._serializeHelper(root, serializedList)
        return "".join(serializedList)
    
    def _serializeHelper(self, root, serializedList):
        if not root:
            return
        
        # Actual value
        serializedList.append(chr(root.val + 48))
        
        for child in root.children:
            self._serializeHelper(child, serializedList)
            
        # Add the sentinel to indicate that all the children
        # for the current node have been processed 
        serializedList.append('#')    
    
    def deserialize(self, data: str) -> 'Node':
        if not data:
            return None
        
        return self._deserializeHelper(data, WrappableInt(0))
        
    def _deserializeHelper(self, data, index):
        
        if index.getValue() == len(data):
            return None
        
        node = Node(ord(data[index.getValue()]) - 48, [])
        index.increment()
        while (data[index.getValue()] != '#'):
            node.children.append(self._deserializeHelper(data, index))
        
        
        # Discard the sentinel. Note that this also moves us
        # forward in the input string. So, we don't have the index
        # progressing inside the above while loop!
        index.increment()
        return node  
```

```java
class Codec {

    class WrappableInt {
        private int value;
        public WrappableInt(int x) {
            this.value = x;
        }
        public int getValue() {
            return this.value;
        }
        public void increment() {
            this.value++;
        }
    }
    
    // Encodes a tree to a single string.
    public String serialize(Node root) {
        
        StringBuilder sb = new StringBuilder();
        this._serializeHelper(root, sb);
        return sb.toString();
    }
    
    private void _serializeHelper(Node root, StringBuilder sb) {
        
        if (root == null) {
            return;
        }
        
        // Add the value of the node
        sb.append((char) (root.val + '0'));
        
        // Recurse on the subtrees and build the 
        // string accordingly
        for (Node child : root.children) {
            this._serializeHelper(child, sb);
        }
        
        // Add the sentinel to indicate that all the children
        // for the current node have been processed
        sb.append('#');
    }

    // Decodes your encoded data to tree.
    public Node deserialize(String data) {
        if(data.isEmpty())
            return null;
        
        return this._deserializeHelper(data, new WrappableInt(0));
    }
    
    private Node _deserializeHelper(String data, WrappableInt index) {  
        
        if (index.getValue() == data.length()) {
            return null;
        }
        
        Node node = new Node(data.charAt(index.getValue()) - '0', new ArrayList<Node>());
        index.increment();
        while (data.charAt(index.getValue()) != '#') {
            node.children.add(this._deserializeHelper(data, index));
        }
        
        // Discard the sentinel. Note that this also moves us
        // forward in the input string. So, we don't have the index
        // progressing inside the above while loop!
        index.increment();
        
        return node;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - `Serialization` : $O(N)$. For every node, we add 2 different values to the final string and every node is processed exactly once.

    - `Deserialization` : $O(N)$. For deserialization, we process the entire string, one character at a time and also construct the tree along the way. So, the overall time complexity for deserialization is $2N = O(N)$.

- Space complexity: 
    - `Serialization` : $O(N)$. The space occupied by the serialization helper function is through recursion stack and the final string that is produced. We know the size of the final string to be $2N$. So, that is one part of the space complexity. The other part is the one occupied by the recursion stack which is $O(N)$. Overall, the space is $O(N)$.

    - `Deserialization` : $O(N)$. For deserialization, the space occupied is by the recursion stack only. We don't use any other intermediate data structures like we did in the previous approach and simply rely on the information in the string and recursion to work it's magic. So, the overall space complexity would be $O(N)$.

>  Where $N$ is the number of nodes in the tree.

---

## 4. Level order traversal

::tabs-start

```python
class Codec:
    def _serializeHelper(self, root, serializedList):
        queue = collections.deque() 
        queue.append(root)
        queue.append(None)
        
        while queue:
            
            # Pop a node
            node = queue.popleft()
            
            # If this is an "endNode", we need to add another one
            # to mark the end of the current level unless this
            # was the last level.
            if (node == None):
                
                # We add a sentinal value of "#" here
                serializedList.append("#")
                if queue:
                    queue.append(None)
                    
            elif node == "C":
                
                # Add a sentinal value of "$" here to mark the switch to a
                # different parent.
                serializedList.append("$")
                
            else:
                
                # Add value of the current node and add all of it's
                # children nodes to the queue. Note how we convert
                # the integers to their corresponding ASCII counterparts.
                serializedList.append(chr(node.val + 48))
                for child in node.children:
                    queue.append(child)
                
                # If this not is NOT the last one on the current level, 
                # add a childNode as well since we move on to processing
                # the next node.
                if queue[0] != None:
                    queue.append("C")
        
    def serialize(self, root: 'Node') -> str:   
        if not root:
            return ""
        
        serializedList = []
        self._serializeHelper(root, serializedList)
        return "".join(serializedList)
        
    def _deserializeHelper(self, data, rootNode):
        
        # We move one level at a time and at every level, we need access
        # to the nodes on the previous level as well so that we can form
        # the children arrays properly. Hence two arrays.
        prevLevel, currentLevel = collections.deque(), collections.deque()
        currentLevel.append(rootNode)
        parentNode = rootNode
        
        # Process the characters in the string one at a time.
        for i in range (1, len(data)):
            if data[i] == "#":
                
                # Special processing for end of level. We need to swap the
                # array lists. Here, we simply re-initialize the "currentLevel"
                # arraylist rather than clearing it.
                prevLevel = currentLevel
                currentLevel = collections.deque()
                
                # Since we move one level down, we take the parent as the first
                # node on the current level.
                parentNode = prevLevel.popleft() if prevLevel else None
                
            else:
                if data[i] == "$":
                    
                    # Special handling for change in parent on the same level
                    parentNode = prevLevel.popleft() if prevLevel else None
                else:
                    childNode = Node(ord(data[i]) - 48, [])
                    currentLevel.append(childNode)
                    parentNode.children.append(childNode)
                   
    def deserialize(self, data: str) -> 'Node':
        if not data:
            return None
        
        rootNode = Node(ord(data[0]) - 48, [])
        self._deserializeHelper(data, rootNode)
        return rootNode
```

```java
class Codec {

    public String serialize(Node root) {
        
        if (root == null) {
            return "";
        }
        
        StringBuilder sb = new StringBuilder();
        this._serializeHelper(root, sb);
        return sb.toString();
    }
    
    private void _serializeHelper(Node root, StringBuilder sb) {
        // Queue to perform a level order traversal of the tree
        Queue<Node> q = new LinkedList<Node>();
        
        // Two dummy nodes that will help us in serialization string formation.
        // We insert the "endNode" whenever a level ends and the "childNode"
        // whenever a node's children are added to the queue and we are about
        // to switch over to the next node.
        Node endNode = new Node();
        Node childNode = new Node();
        q.add(root);
        q.add(endNode);
        
        while (!q.isEmpty()) {
            
            // Pop a node
            Node node = q.poll();
            
            // If this is an "endNode", we need to add another one
            // to mark the end of the current level unless this
            // was the last level.
            if (node == endNode) {
                
                // We add a sentinal value of "#" here
                sb.append('#');
                if (!q.isEmpty()) {
                    q.add(endNode);  
                }
            } else if (node == childNode) {
                
                // Add a sentinal value of "$" here to mark the switch to a
                // different parent.
                sb.append('$');
            } else {
                
                // Add value of the current node and add all of it's
                // children nodes to the queue. Note how we convert
                // the integers to their corresponding ASCII counterparts.
                sb.append((char) (node.val + '0'));
                for (Node child : node.children) {
                    q.add(child);
                }
                
                // If this not is NOT the last one on the current level, 
                // add a childNode as well since we move on to processing
                // the next node.
                if (q.peek() != endNode) {
                    q.add(childNode);
                }
            }
        }
    }

    public Node deserialize(String data) {
        if (data.isEmpty()) {
            return null;
        }
            
        Node rootNode = new Node(data.charAt(0) - '0', new ArrayList<Node>());
        this._deserializeHelper(data, rootNode);
        return rootNode;
    }
    
    private void _deserializeHelper(String data, Node rootNode) {  
        
        // We move one level at a time and at every level, we need access
        // to the nodes on the previous level as well so that we can form
        // the children arrays properly. Hence two arrays.
        LinkedList<Node> currentLevel = new LinkedList<Node>();
        LinkedList<Node> prevLevel = new LinkedList<Node>();
        currentLevel.add(rootNode);
        Node parentNode = rootNode;
        
        // Process the characters in the string one at a time.
        for (int i = 1; i < data.length(); i++) {
            char d = data.charAt(i);
            if (d == '#') {
                // Special processing for end of level. We need to swap the
                // array lists. Here, we simply re-initialize the "currentLevel"
                // arraylist rather than clearing it.
                prevLevel = currentLevel;
                currentLevel = new LinkedList<Node>();
                
                // Since we move one level down, we take the parent as the first
                // node on the current level.
                parentNode = prevLevel.poll();
            } else {
                if (d == '$') {
                    
                    // Special handling for change in parent on the same level
                    parentNode = prevLevel.poll();
                } else {
                    Node childNode = new Node(d - '0', new ArrayList<Node>());    
                    currentLevel.add(childNode);
                    parentNode.children.add(childNode);
                }
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - `Serialization` : $O(N)$. For every node, we add 2 different values to the final string and every node is processed exactly once. We add the value of the node itself and we also add the child switch sentinel. Also, for the nodes that end a particular level, we add the level end sentinel.

    - `Deserialization` : $O(N)$. For deserialization, we process the entire string, one character at a time and also construct the tree along the way. So, the overall time complexity for deserialization is $2N = O(N)$.

- Space complexity: 
    - `Serialization` : $O(N)$. The space occupied by the serialization helper function is through the queue and the final string that is produced. We know the size of the final string to be $2N$. So that is one part of the space complexity. The other part is the one occupied by the queue which is $O(N)$. Overall, the space is $O(N)$.

    - `Deserialization` : $O(N)$. For deserialization, the space is mostly occupied by the two lists that we use. The space complexity there is $O(N)$. Note that when we re-initialize a list, the memory that was allocated earlier is deallocated by the garbage collector and it's essentially equal to a single list of size $O(N)$. 

>  Where $N$ is the number of nodes in the tree.
