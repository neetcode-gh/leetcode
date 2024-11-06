## 1. Depth First Search

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Codec:
    
    # Encodes a tree to a single string.
    def serialize(self, root: Optional[TreeNode]) -> str:
        res = []

        def dfs(node):
            if not node:
                res.append("N")
                return
            res.append(str(node.val))
            dfs(node.left)
            dfs(node.right)

        dfs(root)
        return ",".join(res)
        
    # Decodes your encoded data to tree.
    def deserialize(self, data: str) -> Optional[TreeNode]:
        vals = data.split(",")
        self.i = 0

        def dfs():
            if vals[self.i] == "N":
                self.i += 1
                return None
            node = TreeNode(int(vals[self.i]))
            self.i += 1
            node.left = dfs()
            node.right = dfs()
            return node

        return dfs()
```

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */

public class Codec {
    
    // Encodes a tree to a single string.
    public String serialize(TreeNode root) {
        List<String> res = new ArrayList<>();
        dfsSerialize(root, res);
        return String.join(",", res);
    }

    private void dfsSerialize(TreeNode node, List<String> res) {
        if (node == null) {
            res.add("N");
            return;
        }
        res.add(String.valueOf(node.val));
        dfsSerialize(node.left, res);
        dfsSerialize(node.right, res);
    }

    // Decodes your encoded data to tree.
    public TreeNode deserialize(String data) {
        String[] vals = data.split(",");
        int[] i = {0};
        return dfsDeserialize(vals, i);
    }

    private TreeNode dfsDeserialize(String[] vals, int[] i) {
        if (vals[i[0]].equals("N")) {
            i[0]++;
            return null;
        }
        TreeNode node = new TreeNode(Integer.parseInt(vals[i[0]]));
        i[0]++;
        node.left = dfsDeserialize(vals, i);
        node.right = dfsDeserialize(vals, i);
        return node;
    }
}
```

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */

class Codec {
public:
    // Encodes a tree to a single string.
    string serialize(TreeNode* root) {
        vector<string> res;
        dfsSerialize(root, res);
        return join(res, ",");
    }

    // Decodes your encoded data to tree.
    TreeNode* deserialize(string data) {
        vector<string> vals = split(data, ',');
        int i = 0;
        return dfsDeserialize(vals, i);
    }

private:
    void dfsSerialize(TreeNode* node, vector<string>& res) {
        if (!node) {
            res.push_back("N");
            return;
        }
        res.push_back(to_string(node->val));
        dfsSerialize(node->left, res);
        dfsSerialize(node->right, res);
    }

    TreeNode* dfsDeserialize(vector<string>& vals, int& i) {
        if (vals[i] == "N") {
            i++;
            return NULL;
        }
        TreeNode* node = new TreeNode(stoi(vals[i]));
        i++;
        node->left = dfsDeserialize(vals, i);
        node->right = dfsDeserialize(vals, i);
        return node;
    }

    vector<string> split(const string &s, char delim) {
        vector<string> elems;
        stringstream ss(s);
        string item;
        while (getline(ss, item, delim)) {
            elems.push_back(item);
        }
        return elems;
    }

    string join(const vector<string> &v, const string &delim) {
        ostringstream s;
        for (const auto &i : v) {
            if (&i != &v[0])
                s << delim;
            s << i;
        }
        return s.str();
    }
};
```

```javascript
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     constructor(val = 0, left = null, right = null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */

class Codec {
    /**
     * Encodes a tree to a single string.
     *
     * @param {TreeNode} root
     * @return {string}
     */
    serialize(root) {
        const res = [];
        this.dfsSerialize(root, res);
        return res.join(',');
    }

    dfsSerialize(node, res) {
        if (node === null) {
            res.push('N');
            return;
        }
        res.push(node.val.toString());
        this.dfsSerialize(node.left, res);
        this.dfsSerialize(node.right, res);
    }

    /**
     * Decodes your encoded data to tree.
     *
     * @param {string} data
     * @return {TreeNode}
     */
    deserialize(data) {
        const vals = data.split(',');
        const i = { val: 0 };
        return this.dfsDeserialize(vals, i);
    }

    dfsDeserialize(vals, i) {
        if (vals[i.val] === 'N') {
            i.val++;
            return null;
        }
        const node = new TreeNode(parseInt(vals[i.val]));
        i.val++;
        node.left = this.dfsDeserialize(vals, i);
        node.right = this.dfsDeserialize(vals, i);
        return node;
    }
}
```

```csharp
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     public int val;
 *     public TreeNode left;
 *     public TreeNode right;
 *     public TreeNode(int val=0, TreeNode left=null, TreeNode right=null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */

public class Codec {
    
    // Encodes a tree to a single string.
    public string Serialize(TreeNode root) {
        List<string> res = new List<string>();
        dfsSerialize(root, res);
        return String.Join(",", res);
    }

    private void dfsSerialize(TreeNode node, List<string> res) {
        if (node == null) {
            res.Add("N");
            return;
        }
        res.Add(node.val.ToString());
        dfsSerialize(node.left, res);
        dfsSerialize(node.right, res);
    }

    // Decodes your encoded data to tree.
    public TreeNode Deserialize(string data) {
        string[] vals = data.Split(',');
        int i = 0;
        return dfsDeserialize(vals, ref i);
    }

    private TreeNode dfsDeserialize(string[] vals, ref int i) {
        if (vals[i] == "N") {
            i++;
            return null;
        }
        TreeNode node = new TreeNode(Int32.Parse(vals[i]));
        i++;
        node.left = dfsDeserialize(vals, ref i);
        node.right = dfsDeserialize(vals, ref i);
        return node;
    }
}
```

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */

type Codec struct{}

func Constructor() Codec {
    return Codec{}
}

// Encodes a tree to a single string.
func (this *Codec) serialize(root *TreeNode) string {
    var res []string

    var dfs func(node *TreeNode)
    dfs = func(node *TreeNode) {
        if node == nil {
            res = append(res, "N")
            return
        }
        res = append(res, strconv.Itoa(node.Val))
        dfs(node.Left)
        dfs(node.Right)
    }

    dfs(root)
    return strings.Join(res, ",")
}

// Decodes your encoded data to tree.
func (this *Codec) deserialize(data string) *TreeNode {
    vals := strings.Split(data, ",")
    i := 0

    var dfs func() *TreeNode
    dfs = func() *TreeNode {
        if vals[i] == "N" {
            i++
            return nil
        }
        val, _ := strconv.Atoi(vals[i])
        node := &TreeNode{Val: val}
        i++
        node.Left = dfs()
        node.Right = dfs()
        return node
    }

    return dfs()
}
```

```kotlin
/**
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */

class Codec {

    // Encodes a tree to a single string.
    fun serialize(root: TreeNode?): String {
        val res = mutableListOf<String>()

        fun dfs(node: TreeNode?) {
            if (node == null) {
                res.add("N")
                return
            }
            res.add(node.`val`.toString())
            dfs(node.left)
            dfs(node.right)
        }

        dfs(root)
        return res.joinToString(",")
    }

    // Decodes your encoded data to tree.
    fun deserialize(data: String): TreeNode? {
        val vals = data.split(",")
        var i = 0

        fun dfs(): TreeNode? {
            if (vals[i] == "N") {
                i++
                return null
            }
            val node = TreeNode(vals[i].toInt())
            i++
            node.left = dfs()
            node.right = dfs()
            return node
        }

        return dfs()
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 2. Breadth First Search

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Codec:
    
    # Encodes a tree to a single string.
    def serialize(self, root: Optional[TreeNode]) -> str:
        if not root:
            return "N"
        res = []
        queue = deque([root])
        while queue:
            node = queue.popleft()
            if not node:
                res.append("N")
            else:
                res.append(str(node.val))
                queue.append(node.left)
                queue.append(node.right)
        return ",".join(res)
        
    # Decodes your encoded data to tree.
    def deserialize(self, data: str) -> Optional[TreeNode]:
        vals = data.split(",")
        if vals[0] == "N":
            return None
        root = TreeNode(int(vals[0]))
        queue = deque([root])
        index = 1
        while queue:
            node = queue.popleft()
            if vals[index] != "N":
                node.left = TreeNode(int(vals[index]))
                queue.append(node.left)
            index += 1
            if vals[index] != "N":
                node.right = TreeNode(int(vals[index]))
                queue.append(node.right)
            index += 1
        return root
```

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */

public class Codec {

    // Encodes a tree to a single string.
    public String serialize(TreeNode root) {
        if (root == null) return "N";
        StringBuilder res = new StringBuilder();
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            if (node == null) {
                res.append("N,");
            } else {
                res.append(node.val).append(",");
                queue.add(node.left);
                queue.add(node.right);
            }
        }
        return res.toString();
    }

    // Decodes your encoded data to tree.
    public TreeNode deserialize(String data) {
        String[] vals = data.split(",");
        if (vals[0].equals("N")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(vals[0]));
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        int index = 1;

        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            if (!vals[index].equals("N")) {
                node.left = new TreeNode(Integer.parseInt(vals[index]));
                queue.add(node.left);
            }
            index++;
            if (!vals[index].equals("N")) {
                node.right = new TreeNode(Integer.parseInt(vals[index]));
                queue.add(node.right);
            }
            index++;
        }
        return root;
    }
}
```

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */

class Codec {
public:

    // Encodes a tree to a single string.
    string serialize(TreeNode* root) {
        if (!root) return "N";
        string res;
        queue<TreeNode*> queue;
        queue.push(root);

        while (!queue.empty()) {
            TreeNode* node = queue.front();
            queue.pop();
            if (!node) {
                res += "N,";
            } else {
                res += to_string(node->val) + ",";
                queue.push(node->left);
                queue.push(node->right);
            }
        }
        return res;
    }

    // Decodes your encoded data to tree.
    TreeNode* deserialize(string data) {
        stringstream ss(data);
        string val;
        getline(ss, val, ',');
        if (val == "N") return nullptr;
        TreeNode* root = new TreeNode(stoi(val));
        queue<TreeNode*> queue;
        queue.push(root);

        while (getline(ss, val, ',')) {
            TreeNode* node = queue.front();
            queue.pop();
            if (val != "N") {
                node->left = new TreeNode(stoi(val));
                queue.push(node->left);
            }
            getline(ss, val, ',');
            if (val != "N") {
                node->right = new TreeNode(stoi(val));
                queue.push(node->right);
            }
        }
        return root;
    }
};
```

```javascript
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     constructor(val = 0, left = null, right = null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */

class Codec {
    /**
     * Encodes a tree to a single string.
     *
     * @param {TreeNode} root
     * @return {string}
     */
    serialize(root) {
        if (!root) return "N";
        const res = [];
        const queue = new Queue();
        queue.push(root);

        while (!queue.isEmpty()) {
            const node = queue.pop();
            if (!node) {
                res.push("N");
            } else {
                res.push(node.val);
                queue.push(node.left);
                queue.push(node.right);
            }
        }
        return res.join(",");
    }

    /**
     * Decodes your encoded data to tree.
     *
     * @param {string} data
     * @return {TreeNode}
     */
    deserialize(data) {
        const vals = data.split(",");
        if (vals[0] === "N") return null;
        const root = new TreeNode(parseInt(vals[0]));
        const queue = new Queue([root]);
        let index = 1;

        while (!queue.isEmpty()) {
            const node = queue.pop();
            if (vals[index] !== "N") {
                node.left = new TreeNode(parseInt(vals[index]));
                queue.push(node.left);
            }
            index++;
            if (vals[index] !== "N") {
                node.right = new TreeNode(parseInt(vals[index]));
                queue.push(node.right);
            }
            index++;
        }
        return root;
    }
}
```

```csharp
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     public int val;
 *     public TreeNode left;
 *     public TreeNode right;
 *     public TreeNode(int val=0, TreeNode left=null, TreeNode right=null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */

public class Codec {

    // Encodes a tree to a single string.
    public string Serialize(TreeNode root) {
        if (root == null) return "N";
        var res = new List<string>();
        var queue = new Queue<TreeNode>();
        queue.Enqueue(root);

        while (queue.Count > 0) {
            var node = queue.Dequeue();
            if (node == null) {
                res.Add("N");
            } else {
                res.Add(node.val.ToString());
                queue.Enqueue(node.left);
                queue.Enqueue(node.right);
            }
        }
        return string.Join(",", res);
    }

    // Decodes your encoded data to tree.
    public TreeNode Deserialize(string data) {
        var vals = data.Split(',');
        if (vals[0] == "N") return null;
        var root = new TreeNode(int.Parse(vals[0]));
        var queue = new Queue<TreeNode>();
        queue.Enqueue(root);
        int index = 1;

        while (queue.Count > 0) {
            var node = queue.Dequeue();
            if (vals[index] != "N") {
                node.left = new TreeNode(int.Parse(vals[index]));
                queue.Enqueue(node.left);
            }
            index++;
            if (vals[index] != "N") {
                node.right = new TreeNode(int.Parse(vals[index]));
                queue.Enqueue(node.right);
            }
            index++;
        }
        return root;
    }
}
```

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */

type Codec struct{}

func Constructor() Codec {
    return Codec{}
}

// Encodes a tree to a single string.
func (this *Codec) serialize(root *TreeNode) string {
    if root == nil {
        return "N"
    }
    var res []string
    queue := []*TreeNode{root}

    for len(queue) > 0 {
        node := queue[0]
        queue = queue[1:]

        if node == nil {
            res = append(res, "N")
        } else {
            res = append(res, strconv.Itoa(node.Val))
            queue = append(queue, node.Left)
            queue = append(queue, node.Right)
        }
    }

    return strings.Join(res, ",")
}

// Decodes your encoded data to tree.
func (this *Codec) deserialize(data string) *TreeNode {
    vals := strings.Split(data, ",")
    if vals[0] == "N" {
        return nil
    }
    
    rootVal, _ := strconv.Atoi(vals[0])
    root := &TreeNode{Val: rootVal}
    queue := []*TreeNode{root}
    index := 1

    for len(queue) > 0 && index < len(vals) {
        node := queue[0]
        queue = queue[1:]

        if vals[index] != "N" {
            leftVal, _ := strconv.Atoi(vals[index])
            node.Left = &TreeNode{Val: leftVal}
            queue = append(queue, node.Left)
        }
        index++

        if index < len(vals) && vals[index] != "N" {
            rightVal, _ := strconv.Atoi(vals[index])
            node.Right = &TreeNode{Val: rightVal}
            queue = append(queue, node.Right)
        }
        index++
    }

    return root
}
```

```kotlin
/**
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */

class Codec {

    // Encodes a tree to a single string.
    fun serialize(root: TreeNode?): String {
        if (root == null) return "N"
        val res = mutableListOf<String>()
        val queue: Queue<TreeNode?> = LinkedList()
        queue.add(root)

        while (queue.isNotEmpty()) {
            val node = queue.poll()
            if (node == null) {
                res.add("N")
            } else {
                res.add(node.`val`.toString())
                queue.add(node.left)
                queue.add(node.right)
            }
        }

        return res.joinToString(",")
    }

    // Decodes your encoded data to tree.
    fun deserialize(data: String): TreeNode? {
        val vals = data.split(",")
        if (vals[0] == "N") return null

        val root = TreeNode(vals[0].toInt())
        val queue: Queue<TreeNode> = LinkedList()
        queue.add(root)
        var index = 1

        while (queue.isNotEmpty() && index < vals.size) {
            val node = queue.poll()

            if (vals[index] != "N") {
                node.left = TreeNode(vals[index].toInt())
                queue.add(node.left!!)
            }
            index++

            if (index < vals.size && vals[index] != "N") {
                node.right = TreeNode(vals[index].toInt())
                queue.add(node.right!!)
            }
            index++
        }

        return root
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$