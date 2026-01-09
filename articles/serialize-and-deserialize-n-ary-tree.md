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
        serializeHelper(root, sb, new WrappableInt(1), null);
        return sb.toString();
    }

    private void serializeHelper(Node root, StringBuilder sb, WrappableInt identity, Integer parentId) {
        if (root == null) {
            return;
        }

        sb.append((char) (identity.getValue() + '0'));
        sb.append((char) (root.val + '0'));
        sb.append(parentId != null ? (char) (parentId + '0') : 'N');

        int currentId = identity.getValue();
        for (Node child : root.children) {
            identity.increment();
            serializeHelper(child, sb, identity, currentId);
        }
    }

    public Node deserialize(String data) {
        if (data == null || data.isEmpty()) {
            return null;
        }

        Map<Integer, int[]> nodesAndParents = new HashMap<>();
        Map<Integer, Node> nodes = new HashMap<>();

        for (int i = 0; i < data.length(); i += 3) {
            int identity = data.charAt(i) - '0';
            int orgValue = data.charAt(i + 1) - '0';
            int parentId = data.charAt(i + 2) - '0';
            nodesAndParents.put(identity, new int[]{parentId, orgValue});
            nodes.put(identity, new Node(orgValue, new ArrayList<>()));
        }

        for (int i = 3; i < data.length(); i += 3) {
            int identity = data.charAt(i) - '0';
            int parentId = data.charAt(i + 2) - '0';
            nodes.get(parentId).children.add(nodes.get(identity));
        }

        return nodes.get(data.charAt(0) - '0');
    }
}
```

```cpp
class Codec {
public:
    string serialize(Node* root) {
        string result;
        int identity = 1;
        serializeHelper(root, result, identity, -1);
        return result;
    }

    void serializeHelper(Node* root, string& result, int& identity, int parentId) {
        if (!root) return;

        result += (char)(identity + '0');
        result += (char)(root->val + '0');
        result += (parentId == -1) ? 'N' : (char)(parentId + '0');

        int currentId = identity;
        for (Node* child : root->children) {
            identity++;
            serializeHelper(child, result, identity, currentId);
        }
    }

    Node* deserialize(string data) {
        if (data.empty()) return nullptr;

        unordered_map<int, Node*> nodes;

        for (int i = 0; i < data.size(); i += 3) {
            int identity = data[i] - '0';
            int orgValue = data[i + 1] - '0';
            nodes[identity] = new Node(orgValue, vector<Node*>());
        }

        for (int i = 3; i < data.size(); i += 3) {
            int identity = data[i] - '0';
            int parentId = data[i + 2] - '0';
            nodes[parentId]->children.push_back(nodes[identity]);
        }

        return nodes[data[0] - '0'];
    }
};
```

```javascript
class Codec {
    constructor() {}

    serialize(root) {
        const serializedList = [];
        let identity = { value: 1 };
        this._serializeHelper(root, serializedList, identity, null);
        return serializedList.join('');
    }

    _serializeHelper(root, serializedList, identity, parentId) {
        if (!root) return;

        serializedList.push(String.fromCharCode(identity.value + 48));
        serializedList.push(String.fromCharCode(root.val + 48));
        serializedList.push(parentId !== null ? String.fromCharCode(parentId + 48) : 'N');

        const currentId = identity.value;
        for (const child of root.children) {
            identity.value++;
            this._serializeHelper(child, serializedList, identity, currentId);
        }
    }

    deserialize(data) {
        if (!data) return null;

        const nodes = new Map();

        for (let i = 0; i < data.length; i += 3) {
            const identity = data.charCodeAt(i) - 48;
            const orgValue = data.charCodeAt(i + 1) - 48;
            nodes.set(identity, new _Node(orgValue, []));
        }

        for (let i = 3; i < data.length; i += 3) {
            const identity = data.charCodeAt(i) - 48;
            const parentId = data.charCodeAt(i + 2) - 48;
            nodes.get(parentId).children.push(nodes.get(identity));
        }

        return nodes.get(data.charCodeAt(0) - 48);
    }
}
```

```csharp
public class Codec {
    private int identity;

    public string Serialize(Node root) {
        var sb = new StringBuilder();
        identity = 1;
        SerializeHelper(root, sb, null);
        return sb.ToString();
    }

    private void SerializeHelper(Node root, StringBuilder sb, int? parentId) {
        if (root == null) return;

        sb.Append((char)(identity + '0'));
        sb.Append((char)(root.val + '0'));
        sb.Append(parentId.HasValue ? (char)(parentId.Value + '0') : 'N');

        int currentId = identity;
        foreach (var child in root.children) {
            identity++;
            SerializeHelper(child, sb, currentId);
        }
    }

    public Node Deserialize(string data) {
        if (string.IsNullOrEmpty(data)) return null;

        var nodes = new Dictionary<int, Node>();

        for (int i = 0; i < data.Length; i += 3) {
            int id = data[i] - '0';
            int val = data[i + 1] - '0';
            nodes[id] = new Node(val, new List<Node>());
        }

        for (int i = 3; i < data.Length; i += 3) {
            int id = data[i] - '0';
            int parentId = data[i + 2] - '0';
            nodes[parentId].children.Add(nodes[id]);
        }

        return nodes[data[0] - '0'];
    }
}
```

```go
type Codec struct{}

func Constructor() *Codec {
    return &Codec{}
}

func (this *Codec) serialize(root *Node) string {
    if root == nil {
        return ""
    }
    var result []byte
    identity := 1
    var helper func(node *Node, parentId int)
    helper = func(node *Node, parentId int) {
        if node == nil {
            return
        }
        result = append(result, byte(identity+'0'))
        result = append(result, byte(node.Val+'0'))
        if parentId == -1 {
            result = append(result, 'N')
        } else {
            result = append(result, byte(parentId+'0'))
        }
        currentId := identity
        for _, child := range node.Children {
            identity++
            helper(child, currentId)
        }
    }
    helper(root, -1)
    return string(result)
}

func (this *Codec) deserialize(data string) *Node {
    if len(data) == 0 {
        return nil
    }
    nodes := make(map[int]*Node)
    for i := 0; i < len(data); i += 3 {
        id := int(data[i] - '0')
        val := int(data[i+1] - '0')
        nodes[id] = &Node{Val: val, Children: []*Node{}}
    }
    for i := 3; i < len(data); i += 3 {
        id := int(data[i] - '0')
        parentId := int(data[i+2] - '0')
        nodes[parentId].Children = append(nodes[parentId].Children, nodes[id])
    }
    return nodes[int(data[0]-'0')]
}
```

```kotlin
class Codec {
    private var identity = 1

    fun serialize(root: Node?): String {
        val sb = StringBuilder()
        identity = 1
        serializeHelper(root, sb, null)
        return sb.toString()
    }

    private fun serializeHelper(root: Node?, sb: StringBuilder, parentId: Int?) {
        if (root == null) return

        sb.append((identity + '0'.code).toChar())
        sb.append((root.`val` + '0'.code).toChar())
        sb.append(if (parentId != null) (parentId + '0'.code).toChar() else 'N')

        val currentId = identity
        for (child in root.children) {
            identity++
            serializeHelper(child, sb, currentId)
        }
    }

    fun deserialize(data: String): Node? {
        if (data.isEmpty()) return null

        val nodes = mutableMapOf<Int, Node>()

        for (i in data.indices step 3) {
            val id = data[i] - '0'
            val value = data[i + 1] - '0'
            nodes[id] = Node(value).apply { children = mutableListOf() }
        }

        for (i in 3 until data.length step 3) {
            val id = data[i] - '0'
            val parentId = data[i + 2] - '0'
            nodes[parentId]!!.children.add(nodes[id]!!)
        }

        return nodes[data[0] - '0']
    }
}
```

```swift
class Codec {
    private var identity = 1

    func serialize(_ root: Node?) -> String {
        var result = [Character]()
        identity = 1
        serializeHelper(root, &result, nil)
        return String(result)
    }

    private func serializeHelper(_ root: Node?, _ result: inout [Character], _ parentId: Int?) {
        guard let root = root else { return }

        result.append(Character(UnicodeScalar(identity + 48)!))
        result.append(Character(UnicodeScalar(root.val + 48)!))
        if let parentId = parentId {
            result.append(Character(UnicodeScalar(parentId + 48)!))
        } else {
            result.append("N")
        }

        let currentId = identity
        for child in root.children {
            identity += 1
            serializeHelper(child, &result, currentId)
        }
    }

    func deserialize(_ data: String) -> Node? {
        if data.isEmpty { return nil }

        var nodes = [Int: Node]()
        let chars = Array(data)

        for i in stride(from: 0, to: chars.count, by: 3) {
            let id = Int(chars[i].asciiValue! - 48)
            let val = Int(chars[i + 1].asciiValue! - 48)
            nodes[id] = Node(val)
            nodes[id]!.children = []
        }

        for i in stride(from: 3, to: chars.count, by: 3) {
            let id = Int(chars[i].asciiValue! - 48)
            let parentId = Int(chars[i + 2].asciiValue! - 48)
            nodes[parentId]!.children.append(nodes[id]!)
        }

        return nodes[Int(chars[0].asciiValue! - 48)]
    }
}
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

```javascript
class Codec {
    constructor() {}

    /**
     * @param {_Node|null} root
     * @return {string}
     */
    serialize = function (root) {
        const serializedList = [];
        this._serializeHelper(root, serializedList);
        return serializedList.join('');
    }

    _serializeHelper = function (root, serializedList) {
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
    }

    /**
     * @param {string} data
     * @return {_Node|null}
     */
    deserialize = function (data) {
        if (!data) {
            return null;
        }

        const index = { value: 0 };
        return this._deserializeHelper(data, index);
    }

    _deserializeHelper = function (data, index) {
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
    }
}
```

```cpp
class Codec {
public:
    string serialize(Node* root) {
        string result;
        serializeHelper(root, result);
        return result;
    }

    void serializeHelper(Node* root, string& result) {
        if (!root) return;

        result += (char)(root->val + '0');
        result += (char)(root->children.size() + '0');

        for (Node* child : root->children) {
            serializeHelper(child, result);
        }
    }

    Node* deserialize(string data) {
        if (data.empty()) return nullptr;
        int index = 0;
        return deserializeHelper(data, index);
    }

    Node* deserializeHelper(string& data, int& index) {
        if (index == data.size()) return nullptr;

        Node* node = new Node(data[index] - '0', vector<Node*>());
        index++;
        int numChildren = data[index] - '0';
        for (int i = 0; i < numChildren; i++) {
            index++;
            node->children.push_back(deserializeHelper(data, index));
        }

        return node;
    }
};
```

```csharp
public class Codec {
    public string Serialize(Node root) {
        var sb = new StringBuilder();
        SerializeHelper(root, sb);
        return sb.ToString();
    }

    private void SerializeHelper(Node root, StringBuilder sb) {
        if (root == null) return;

        sb.Append((char)(root.val + '0'));
        sb.Append((char)(root.children.Count + '0'));

        foreach (var child in root.children) {
            SerializeHelper(child, sb);
        }
    }

    public Node Deserialize(string data) {
        if (string.IsNullOrEmpty(data)) return null;
        int index = 0;
        return DeserializeHelper(data, ref index);
    }

    private Node DeserializeHelper(string data, ref int index) {
        if (index == data.Length) return null;

        var node = new Node(data[index] - '0', new List<Node>());
        index++;
        int numChildren = data[index] - '0';
        for (int i = 0; i < numChildren; i++) {
            index++;
            node.children.Add(DeserializeHelper(data, ref index));
        }

        return node;
    }
}
```

```go
type Codec struct{}

func Constructor() *Codec {
    return &Codec{}
}

func (this *Codec) serialize(root *Node) string {
    var result []byte
    var helper func(node *Node)
    helper = func(node *Node) {
        if node == nil {
            return
        }
        result = append(result, byte(node.Val+'0'))
        result = append(result, byte(len(node.Children)+'0'))
        for _, child := range node.Children {
            helper(child)
        }
    }
    helper(root)
    return string(result)
}

func (this *Codec) deserialize(data string) *Node {
    if len(data) == 0 {
        return nil
    }
    index := 0
    var helper func() *Node
    helper = func() *Node {
        if index == len(data) {
            return nil
        }
        node := &Node{Val: int(data[index] - '0'), Children: []*Node{}}
        index++
        numChildren := int(data[index] - '0')
        for i := 0; i < numChildren; i++ {
            index++
            node.Children = append(node.Children, helper())
        }
        return node
    }
    return helper()
}
```

```kotlin
class Codec {
    fun serialize(root: Node?): String {
        val sb = StringBuilder()
        serializeHelper(root, sb)
        return sb.toString()
    }

    private fun serializeHelper(root: Node?, sb: StringBuilder) {
        if (root == null) return

        sb.append((root.`val` + '0'.code).toChar())
        sb.append((root.children.size + '0'.code).toChar())

        for (child in root.children) {
            serializeHelper(child, sb)
        }
    }

    fun deserialize(data: String): Node? {
        if (data.isEmpty()) return null
        val index = intArrayOf(0)
        return deserializeHelper(data, index)
    }

    private fun deserializeHelper(data: String, index: IntArray): Node? {
        if (index[0] == data.length) return null

        val node = Node(data[index[0]] - '0').apply { children = mutableListOf() }
        index[0]++
        val numChildren = data[index[0]] - '0'
        for (i in 0 until numChildren) {
            index[0]++
            node.children.add(deserializeHelper(data, index)!!)
        }

        return node
    }
}
```

```swift
class Codec {
    func serialize(_ root: Node?) -> String {
        var result = [Character]()
        serializeHelper(root, &result)
        return String(result)
    }

    private func serializeHelper(_ root: Node?, _ result: inout [Character]) {
        guard let root = root else { return }

        result.append(Character(UnicodeScalar(root.val + 48)!))
        result.append(Character(UnicodeScalar(root.children.count + 48)!))

        for child in root.children {
            serializeHelper(child, &result)
        }
    }

    func deserialize(_ data: String) -> Node? {
        if data.isEmpty { return nil }
        var index = 0
        let chars = Array(data)
        return deserializeHelper(chars, &index)
    }

    private func deserializeHelper(_ data: [Character], _ index: inout Int) -> Node? {
        if index == data.count { return nil }

        let node = Node(Int(data[index].asciiValue! - 48))
        node.children = []
        index += 1
        let numChildren = Int(data[index].asciiValue! - 48)
        for _ in 0..<numChildren {
            index += 1
            node.children.append(deserializeHelper(data, &index)!)
        }

        return node
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

```cpp
class Codec {
public:
    string serialize(Node* root) {
        string result;
        serializeHelper(root, result);
        return result;
    }

    void serializeHelper(Node* root, string& result) {
        if (!root) return;

        result += (char)(root->val + '0');

        for (Node* child : root->children) {
            serializeHelper(child, result);
        }

        result += '#';
    }

    Node* deserialize(string data) {
        if (data.empty()) return nullptr;
        int index = 0;
        return deserializeHelper(data, index);
    }

    Node* deserializeHelper(string& data, int& index) {
        if (index == data.size()) return nullptr;

        Node* node = new Node(data[index] - '0', vector<Node*>());
        index++;
        while (data[index] != '#') {
            node->children.push_back(deserializeHelper(data, index));
        }

        index++;
        return node;
    }
};
```

```javascript
class Codec {
    constructor() {}

    serialize(root) {
        const serializedList = [];
        this._serializeHelper(root, serializedList);
        return serializedList.join('');
    }

    _serializeHelper(root, serializedList) {
        if (!root) return;

        serializedList.push(String.fromCharCode(root.val + 48));

        for (const child of root.children) {
            this._serializeHelper(child, serializedList);
        }

        serializedList.push('#');
    }

    deserialize(data) {
        if (!data) return null;

        const index = { value: 0 };
        return this._deserializeHelper(data, index);
    }

    _deserializeHelper(data, index) {
        if (index.value === data.length) return null;

        const node = new _Node(data.charCodeAt(index.value) - 48, []);
        index.value++;
        while (data[index.value] !== '#') {
            node.children.push(this._deserializeHelper(data, index));
        }

        index.value++;
        return node;
    }
}
```

```csharp
public class Codec {
    public string Serialize(Node root) {
        var sb = new StringBuilder();
        SerializeHelper(root, sb);
        return sb.ToString();
    }

    private void SerializeHelper(Node root, StringBuilder sb) {
        if (root == null) return;

        sb.Append((char)(root.val + '0'));

        foreach (var child in root.children) {
            SerializeHelper(child, sb);
        }

        sb.Append('#');
    }

    public Node Deserialize(string data) {
        if (string.IsNullOrEmpty(data)) return null;
        int index = 0;
        return DeserializeHelper(data, ref index);
    }

    private Node DeserializeHelper(string data, ref int index) {
        if (index == data.Length) return null;

        var node = new Node(data[index] - '0', new List<Node>());
        index++;
        while (data[index] != '#') {
            node.children.Add(DeserializeHelper(data, ref index));
        }

        index++;
        return node;
    }
}
```

```go
type Codec struct{}

func Constructor() *Codec {
    return &Codec{}
}

func (this *Codec) serialize(root *Node) string {
    var result []byte
    var helper func(node *Node)
    helper = func(node *Node) {
        if node == nil {
            return
        }
        result = append(result, byte(node.Val+'0'))
        for _, child := range node.Children {
            helper(child)
        }
        result = append(result, '#')
    }
    helper(root)
    return string(result)
}

func (this *Codec) deserialize(data string) *Node {
    if len(data) == 0 {
        return nil
    }
    index := 0
    var helper func() *Node
    helper = func() *Node {
        if index == len(data) {
            return nil
        }
        node := &Node{Val: int(data[index] - '0'), Children: []*Node{}}
        index++
        for data[index] != '#' {
            node.Children = append(node.Children, helper())
        }
        index++
        return node
    }
    return helper()
}
```

```kotlin
class Codec {
    fun serialize(root: Node?): String {
        val sb = StringBuilder()
        serializeHelper(root, sb)
        return sb.toString()
    }

    private fun serializeHelper(root: Node?, sb: StringBuilder) {
        if (root == null) return

        sb.append((root.`val` + '0'.code).toChar())

        for (child in root.children) {
            serializeHelper(child, sb)
        }

        sb.append('#')
    }

    fun deserialize(data: String): Node? {
        if (data.isEmpty()) return null
        val index = intArrayOf(0)
        return deserializeHelper(data, index)
    }

    private fun deserializeHelper(data: String, index: IntArray): Node? {
        if (index[0] == data.length) return null

        val node = Node(data[index[0]] - '0').apply { children = mutableListOf() }
        index[0]++
        while (data[index[0]] != '#') {
            node.children.add(deserializeHelper(data, index)!!)
        }

        index[0]++
        return node
    }
}
```

```swift
class Codec {
    func serialize(_ root: Node?) -> String {
        var result = [Character]()
        serializeHelper(root, &result)
        return String(result)
    }

    private func serializeHelper(_ root: Node?, _ result: inout [Character]) {
        guard let root = root else { return }

        result.append(Character(UnicodeScalar(root.val + 48)!))

        for child in root.children {
            serializeHelper(child, &result)
        }

        result.append("#")
    }

    func deserialize(_ data: String) -> Node? {
        if data.isEmpty { return nil }
        var index = 0
        let chars = Array(data)
        return deserializeHelper(chars, &index)
    }

    private func deserializeHelper(_ data: [Character], _ index: inout Int) -> Node? {
        if index == data.count { return nil }

        let node = Node(Int(data[index].asciiValue! - 48))
        node.children = []
        index += 1
        while data[index] != "#" {
            node.children.append(deserializeHelper(data, &index)!)
        }

        index += 1
        return node
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

```cpp
class Codec {
private:
    void _serializeHelper(Node* root, string& serializedList) {
        deque<variant<Node*, char>> queue;
        queue.push_back(root);
        queue.push_back(nullptr);
        
        while (!queue.empty()) {
            
            // Pop a node
            auto front = queue.front();
            queue.pop_front();
            
            // If this is an "endNode", we need to add another one
            // to mark the end of the current level unless this
            // was the last level.
            if (holds_alternative<Node*>(front) && get<Node*>(front) == nullptr) {
                
                // We add a sentinel value of "#" here
                serializedList += "#,";
                if (!queue.empty()) {
                    queue.push_back(nullptr);
                }
            }
            // Add a sentinel value of "$" here to mark the switch to a
            // different parent.
            else if (holds_alternative<char>(front) && get<char>(front) == 'C') {
                serializedList += "$,";
            }
            else {
                
                // Add value of the current node and add all of its
                // children nodes to the queue.
                Node* node = get<Node*>(front);
                serializedList += to_string(node->val) + ",";
                for (Node* child : node->children) {
                    queue.push_back(child);
                }
                
                // If this node is NOT the last one on the current level,
                // add a childNode as well since we move on to processing
                // the next node.
                if (!queue.empty() && 
                    !(holds_alternative<Node*>(queue.front()) && get<Node*>(queue.front()) == nullptr)) {
                    queue.push_back('C');
                }
            }
        }
    }
    
    void _deserializeHelper(const string& data, Node* rootNode) {
        
        // We move one level at a time and at every level, we need access
        // to the nodes on the previous level as well so that we can form
        // the children arrays properly. Hence two arrays.
        deque<Node*> prevLevel, currentLevel;
        currentLevel.push_back(rootNode);
        Node* parentNode = rootNode;
        
        int i = 0;
        // Skip past first value (already parsed for rootNode)
        while (i < data.length() && data[i] != ',') i++;
        i++; // skip comma
        
        // Process the characters in the string one at a time.
        while (i < data.length()) {
            
            // Special processing for end of level. We need to swap the
            // array lists. Here, we simply re-initialize the "currentLevel"
            // arraylist rather than clearing it.
            if (data[i] == '#') {
                prevLevel = currentLevel;
                currentLevel = deque<Node*>();
                
                // Since we move one level down, we take the parent as the first
                // node on the current level.
                if (!prevLevel.empty()) {
                    parentNode = prevLevel.front();
                    prevLevel.pop_front();
                } else {
                    parentNode = nullptr;
                }
                i += 2; // skip "#,"
            }
            // Special handling for change in parent on the same level
            else if (data[i] == '$') {
                if (!prevLevel.empty()) {
                    parentNode = prevLevel.front();
                    prevLevel.pop_front();
                } else {
                    parentNode = nullptr;
                }
                i += 2; // skip "$,"
            }
            else {
                // Parse number (handles multi-digit values)
                int val = 0;
                while (i < data.length() && data[i] != ',') {
                    val = val * 10 + (data[i] - '0');
                    i++;
                }
                i++; // skip comma
                
                Node* childNode = new Node(val, vector<Node*>());
                currentLevel.push_back(childNode);
                parentNode->children.push_back(childNode);
            }
        }
    }
    
public:
    string serialize(Node* root) {
        if (root == nullptr) {
            return "";
        }
        
        string serializedList;
        _serializeHelper(root, serializedList);
        return serializedList;
    }
    
    Node* deserialize(string data) {
        if (data.empty()) {
            return nullptr;
        }
        
        // Parse first value (handles multi-digit values)
        int val = 0;
        int i = 0;
        while (i < data.length() && data[i] != ',') {
            val = val * 10 + (data[i] - '0');
            i++;
        }
        
        Node* rootNode = new Node(val, vector<Node*>());
        _deserializeHelper(data, rootNode);
        return rootNode;
    }
};
```

```javascript
class Codec {
    _serializeHelper(root, serializedList) {
        const queue = new Deque();
        queue.pushBack(root);
        queue.pushBack(null);
        
        while (queue.size() > 0) {
            
            // Pop a node
            const node = queue.popFront();
            
            // If this is an "endNode", we need to add another one
            // to mark the end of the current level unless this
            // was the last level.
            if (node === null) {
                
                // We add a sentinel value of "#" here
                serializedList.push("#");
                if (queue.size() > 0) {
                    queue.pushBack(null);
                }
                    
            } else if (node === "C") {
                
                // Add a sentinel value of "$" here to mark the switch to a
                // different parent.
                serializedList.push("$");
                
            } else {
                
                // Add value of the current node and add all of its
                // children nodes to the queue. Note how we convert
                // the integers to their corresponding ASCII counterparts.
                serializedList.push(String.fromCharCode(node.val + 48));
                for (const child of node.children) {
                    queue.pushBack(child);
                }
                
                // If this node is NOT the last one on the current level,
                // add a childNode as well since we move on to processing
                // the next node.
                if (queue.front() !== null) {
                    queue.pushBack("C");
                }
            }
        }
    }
    
    serialize(root) {
        if (!root) {
            return "";
        }
        
        const serializedList = [];
        this._serializeHelper(root, serializedList);
        return serializedList.join("");
    }
    
    _deserializeHelper(data, rootNode) {
        
        // We move one level at a time and at every level, we need access
        // to the nodes on the previous level as well so that we can form
        // the children arrays properly. Hence two arrays.
        let prevLevel = new Deque();
        let currentLevel = new Deque();
        currentLevel.pushBack(rootNode);
        let parentNode = rootNode;
        
        // Process the characters in the string one at a time.
        for (let i = 1; i < data.length; i++) {
            if (data[i] === "#") {
                
                // Special processing for end of level. We need to swap the
                // array lists. Here, we simply re-initialize the "currentLevel"
                // arraylist rather than clearing it.
                prevLevel = currentLevel;
                currentLevel = new Deque();
                
                // Since we move one level down, we take the parent as the first
                // node on the current level.
                parentNode = prevLevel.size() > 0 ? prevLevel.popFront() : null;
                
            } else {
                if (data[i] === "$") {
                    
                    // Special handling for change in parent on the same level
                    parentNode = prevLevel.size() > 0 ? prevLevel.popFront() : null;
                } else {
                    const childNode = new _Node(data.charCodeAt(i) - 48, []);
                    currentLevel.pushBack(childNode);
                    parentNode.children.push(childNode);
                }
            }
        }
    }
    
    deserialize(data) {
        if (!data) {
            return null;
        }
        
        const rootNode = new _Node(data.charCodeAt(0) - 48, []);
        this._deserializeHelper(data, rootNode);
        return rootNode;
    }
}
```

```csharp
public class Codec {
    public string Serialize(Node root) {
        if (root == null) return "";

        var serializedList = new List<string>();
        SerializeHelper(root, serializedList);
        return string.Join("", serializedList);
    }

    private void SerializeHelper(Node root, List<string> serializedList) {
        var queue = new Queue<object>();
        queue.Enqueue(root);
        queue.Enqueue(null);

        while (queue.Count > 0) {
            var item = queue.Dequeue();

            if (item == null) {
                serializedList.Add("#");
                if (queue.Count > 0) {
                    queue.Enqueue(null);
                }
            } else if (item is string && (string)item == "C") {
                serializedList.Add("$");
            } else {
                var node = (Node)item;
                serializedList.Add(((char)(node.val + '0')).ToString());
                foreach (var child in node.children) {
                    queue.Enqueue(child);
                }
                if (queue.Count > 0 && queue.Peek() != null) {
                    queue.Enqueue("C");
                }
            }
        }
    }

    public Node Deserialize(string data) {
        if (string.IsNullOrEmpty(data)) return null;

        var rootNode = new Node(data[0] - '0', new List<Node>());
        DeserializeHelper(data, rootNode);
        return rootNode;
    }

    private void DeserializeHelper(string data, Node rootNode) {
        var prevLevel = new Queue<Node>();
        var currentLevel = new Queue<Node>();
        currentLevel.Enqueue(rootNode);
        var parentNode = rootNode;

        for (int i = 1; i < data.Length; i++) {
            char d = data[i];
            if (d == '#') {
                prevLevel = currentLevel;
                currentLevel = new Queue<Node>();
                parentNode = prevLevel.Count > 0 ? prevLevel.Dequeue() : null;
            } else if (d == '$') {
                parentNode = prevLevel.Count > 0 ? prevLevel.Dequeue() : null;
            } else {
                var childNode = new Node(d - '0', new List<Node>());
                currentLevel.Enqueue(childNode);
                parentNode.children.Add(childNode);
            }
        }
    }
}
```

```go
type Codec struct{}

func Constructor() *Codec {
    return &Codec{}
}

func (this *Codec) serialize(root *Node) string {
    if root == nil {
        return ""
    }

    var result []byte
    type item struct {
        node   *Node
        isChar bool
        char   byte
    }

    queue := []item{{node: root}, {isChar: true, char: 0}}

    for len(queue) > 0 {
        front := queue[0]
        queue = queue[1:]

        if front.isChar && front.char == 0 {
            result = append(result, '#')
            if len(queue) > 0 {
                queue = append(queue, item{isChar: true, char: 0})
            }
        } else if front.isChar && front.char == 'C' {
            result = append(result, '$')
        } else {
            node := front.node
            result = append(result, byte(node.Val+'0'))
            for _, child := range node.Children {
                queue = append(queue, item{node: child})
            }
            if len(queue) > 0 && !(queue[0].isChar && queue[0].char == 0) {
                queue = append(queue, item{isChar: true, char: 'C'})
            }
        }
    }

    return string(result)
}

func (this *Codec) deserialize(data string) *Node {
    if len(data) == 0 {
        return nil
    }

    rootNode := &Node{Val: int(data[0] - '0'), Children: []*Node{}}
    prevLevel := []*Node{}
    currentLevel := []*Node{rootNode}
    parentNode := rootNode

    for i := 1; i < len(data); i++ {
        d := data[i]
        if d == '#' {
            prevLevel = currentLevel
            currentLevel = []*Node{}
            if len(prevLevel) > 0 {
                parentNode = prevLevel[0]
                prevLevel = prevLevel[1:]
            } else {
                parentNode = nil
            }
        } else if d == '$' {
            if len(prevLevel) > 0 {
                parentNode = prevLevel[0]
                prevLevel = prevLevel[1:]
            } else {
                parentNode = nil
            }
        } else {
            childNode := &Node{Val: int(d - '0'), Children: []*Node{}}
            currentLevel = append(currentLevel, childNode)
            parentNode.Children = append(parentNode.Children, childNode)
        }
    }

    return rootNode
}
```

```kotlin
class Codec {
    fun serialize(root: Node?): String {
        if (root == null) return ""

        val serializedList = mutableListOf<String>()
        val queue = ArrayDeque<Any?>()
        queue.add(root)
        queue.add(null)

        while (queue.isNotEmpty()) {
            when (val item = queue.removeFirst()) {
                null -> {
                    serializedList.add("#")
                    if (queue.isNotEmpty()) {
                        queue.add(null)
                    }
                }
                "C" -> {
                    serializedList.add("$")
                }
                is Node -> {
                    serializedList.add((item.`val` + '0'.code).toChar().toString())
                    for (child in item.children) {
                        queue.add(child)
                    }
                    if (queue.isNotEmpty() && queue.first() != null) {
                        queue.add("C")
                    }
                }
            }
        }

        return serializedList.joinToString("")
    }

    fun deserialize(data: String): Node? {
        if (data.isEmpty()) return null

        val rootNode = Node(data[0] - '0').apply { children = mutableListOf() }
        var prevLevel = ArrayDeque<Node>()
        var currentLevel = ArrayDeque<Node>()
        currentLevel.add(rootNode)
        var parentNode: Node? = rootNode

        for (i in 1 until data.length) {
            when (val d = data[i]) {
                '#' -> {
                    prevLevel = currentLevel
                    currentLevel = ArrayDeque()
                    parentNode = if (prevLevel.isNotEmpty()) prevLevel.removeFirst() else null
                }
                '$' -> {
                    parentNode = if (prevLevel.isNotEmpty()) prevLevel.removeFirst() else null
                }
                else -> {
                    val childNode = Node(d - '0').apply { children = mutableListOf() }
                    currentLevel.add(childNode)
                    parentNode?.children?.add(childNode)
                }
            }
        }

        return rootNode
    }
}
```

```swift
class Codec {
    func serialize(_ root: Node?) -> String {
        guard let root = root else { return "" }

        var result = [Character]()
        var queue: [Any?] = [root, nil]

        while !queue.isEmpty {
            let item = queue.removeFirst()

            if item == nil {
                result.append("#")
                if !queue.isEmpty {
                    queue.append(nil)
                }
            } else if let str = item as? String, str == "C" {
                result.append("$")
            } else if let node = item as? Node {
                result.append(Character(UnicodeScalar(node.val + 48)!))
                for child in node.children {
                    queue.append(child)
                }
                if !queue.isEmpty && queue[0] != nil {
                    queue.append("C")
                }
            }
        }

        return String(result)
    }

    func deserialize(_ data: String) -> Node? {
        if data.isEmpty { return nil }

        let chars = Array(data)
        let rootNode = Node(Int(chars[0].asciiValue! - 48))
        rootNode.children = []

        var prevLevel = [Node]()
        var currentLevel = [rootNode]
        var parentNode: Node? = rootNode

        for i in 1..<chars.count {
            let d = chars[i]
            if d == "#" {
                prevLevel = currentLevel
                currentLevel = []
                if !prevLevel.isEmpty {
                    parentNode = prevLevel.removeFirst()
                } else {
                    parentNode = nil
                }
            } else if d == "$" {
                if !prevLevel.isEmpty {
                    parentNode = prevLevel.removeFirst()
                } else {
                    parentNode = nil
                }
            } else {
                let childNode = Node(Int(d.asciiValue! - 48))
                childNode.children = []
                currentLevel.append(childNode)
                parentNode?.children.append(childNode)
            }
        }

        return rootNode
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
