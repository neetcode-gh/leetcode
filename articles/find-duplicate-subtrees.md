## 1. Brute Force (DFS)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def findDuplicateSubtrees(self, root: Optional[TreeNode]) -> List[Optional[TreeNode]]:
        def same(node1, node2):
            if not node1 and not node2:
                return True
            if not node1 or not node2:
                return False
            return (node1.val == node2.val and
                    same(node1.left, node2.left) and
                    same(node1.right, node2.right))

        subTree = []
        def dfs(root):
            if not root:
                return
            subTree.append(root)
            dfs(root.left)
            dfs(root.right)

        dfs(root)
        res = []
        seen = set()

        for i in range(len(subTree)):
            if subTree[i] in seen:
                continue
            for j in range(i + 1, len(subTree)):
                if subTree[j] in seen:
                    continue

                if same(subTree[i], subTree[j]):
                    if subTree[i] not in seen:
                        res.append(subTree[i])
                        seen.add(subTree[i])
                    seen.add(subTree[j])
        return res
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
public class Solution {
    public List<TreeNode> findDuplicateSubtrees(TreeNode root) {
        List<TreeNode> res = new ArrayList<>();
        Set<TreeNode> seen = new HashSet<>();
        List<TreeNode> subTree = new ArrayList<>();
        dfs(root, subTree);

        for (int i = 0; i < subTree.size(); i++) {
            if (seen.contains(subTree.get(i))) continue;
            for (int j = i + 1; j < subTree.size(); j++) {
                if (seen.contains(subTree.get(j))) continue;

                if (same(subTree.get(i), subTree.get(j))) {
                    if (!seen.contains(subTree.get(i))) {
                        res.add(subTree.get(i));
                        seen.add(subTree.get(i));
                    }
                    seen.add(subTree.get(j));
                }
            }
        }
        return res;
    }

    private boolean same(TreeNode node1, TreeNode node2) {
        if (node1 == null && node2 == null) return true;
        if (node1 == null || node2 == null) return false;
        return node1.val == node2.val &&
               same(node1.left, node2.left) &&
               same(node1.right, node2.right);
    }

    private void dfs(TreeNode root, List<TreeNode> subTree) {
        if (root == null) return;
        subTree.add(root);
        dfs(root.left, subTree);
        dfs(root.right, subTree);
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
class Solution {
public:
    vector<TreeNode*> findDuplicateSubtrees(TreeNode* root) {
        vector<TreeNode*> res;
        unordered_set<TreeNode*> seen;
        vector<TreeNode*> subTree;
        dfs(root, subTree);

        for (int i = 0; i < subTree.size(); i++) {
            if (seen.count(subTree[i])) continue;
            for (int j = i + 1; j < subTree.size(); j++) {
                if (seen.count(subTree[j])) continue;

                if (same(subTree[i], subTree[j])) {
                    if (!seen.count(subTree[i])) {
                        res.push_back(subTree[i]);
                        seen.insert(subTree[i]);
                    }
                    seen.insert(subTree[j]);
                }
            }
        }
        return res;
    }

private:
    bool same(TreeNode* node1, TreeNode* node2) {
        if (!node1 && !node2) return true;
        if (!node1 || !node2) return false;
        return node1->val == node2->val &&
               same(node1->left, node2->left) &&
               same(node1->right, node2->right);
    }

    void dfs(TreeNode* root, vector<TreeNode*>& subTree) {
        if (!root) return;
        subTree.push_back(root);
        dfs(root->left, subTree);
        dfs(root->right, subTree);
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
class Solution {
    /**
     * @param {TreeNode} root
     * @return {TreeNode[]}
     */
    findDuplicateSubtrees(root) {
        const res = [];
        const seen = new Set();

        const subTree = [];
        const dfs = (root) => {
            if (!root) return;
            subTree.push(root);
            dfs(root.left);
            dfs(root.right);
        };
        dfs(root);

        const same = (node1, node2) => {
            if (!node1 && !node2) return true;
            if (!node1 || !node2) return false;
            return (
                node1.val === node2.val &&
                same(node1.left, node2.left) &&
                same(node1.right, node2.right)
            );
        };

        for (let i = 0; i < subTree.length; i++) {
            if (seen.has(subTree[i])) continue;
            for (let j = i + 1; j < subTree.length; j++) {
                if (seen.has(subTree[j])) continue;

                if (same(subTree[i], subTree[j])) {
                    if (!seen.has(subTree[i])) {
                        res.push(subTree[i]);
                        seen.add(subTree[i]);
                    }
                    seen.add(subTree[j]);
                }
            }
        }

        return res;
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
func findDuplicateSubtrees(root *TreeNode) []*TreeNode {
    var subTree []*TreeNode
    seen := make(map[*TreeNode]bool)
    res := []*TreeNode{}

    var dfs func(node *TreeNode)
    dfs = func(node *TreeNode) {
        if node == nil {
            return
        }
        subTree = append(subTree, node)
        dfs(node.Left)
        dfs(node.Right)
    }

    var same func(node1, node2 *TreeNode) bool
    same = func(node1, node2 *TreeNode) bool {
        if node1 == nil && node2 == nil {
            return true
        }
        if node1 == nil || node2 == nil {
            return false
        }
        return node1.Val == node2.Val &&
            same(node1.Left, node2.Left) &&
            same(node1.Right, node2.Right)
    }

    dfs(root)

    for i := 0; i < len(subTree); i++ {
        if seen[subTree[i]] {
            continue
        }
        for j := i + 1; j < len(subTree); j++ {
            if seen[subTree[j]] {
                continue
            }
            if same(subTree[i], subTree[j]) {
                if !seen[subTree[i]] {
                    res = append(res, subTree[i])
                    seen[subTree[i]] = true
                }
                seen[subTree[j]] = true
            }
        }
    }

    return res
}
```

```kotlin
/**
 * Example:
 * var ti = TreeNode(5)
 * var v = ti.`val`
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun findDuplicateSubtrees(root: TreeNode?): List<TreeNode?> {
        val res = mutableListOf<TreeNode?>()
        val seen = mutableSetOf<TreeNode>()
        val subTree = mutableListOf<TreeNode>()

        fun dfs(node: TreeNode?) {
            if (node == null) return
            subTree.add(node)
            dfs(node.left)
            dfs(node.right)
        }

        fun same(node1: TreeNode?, node2: TreeNode?): Boolean {
            if (node1 == null && node2 == null) return true
            if (node1 == null || node2 == null) return false
            return node1.`val` == node2.`val` &&
                   same(node1.left, node2.left) &&
                   same(node1.right, node2.right)
        }

        dfs(root)

        for (i in subTree.indices) {
            if (subTree[i] in seen) continue
            for (j in i + 1 until subTree.size) {
                if (subTree[j] in seen) continue
                if (same(subTree[i], subTree[j])) {
                    if (subTree[i] !in seen) {
                        res.add(subTree[i])
                        seen.add(subTree[i])
                    }
                    seen.add(subTree[j])
                }
            }
        }

        return res
    }
}
```

```swift
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     public var val: Int
 *     public var left: TreeNode?
 *     public var right: TreeNode?
 *     public init() { self.val = 0; self.left = nil; self.right = nil; }
 *     public init(_ val: Int) { self.val = val; self.left = nil; self.right = nil; }
 *     public init(_ val: Int, _ left: TreeNode?, _ right: TreeNode?) {
 *         self.val = val
 *         self.left = left
 *         self.right = right
 *     }
 * }
 */
class Solution {
    func findDuplicateSubtrees(_ root: TreeNode?) -> [TreeNode?] {
        var res = [TreeNode?]()
        var seen = Set<ObjectIdentifier>()
        var subTree = [TreeNode]()

        func dfs(_ node: TreeNode?) {
            guard let node = node else { return }
            subTree.append(node)
            dfs(node.left)
            dfs(node.right)
        }

        func same(_ node1: TreeNode?, _ node2: TreeNode?) -> Bool {
            if node1 == nil && node2 == nil { return true }
            guard let n1 = node1, let n2 = node2 else { return false }
            return n1.val == n2.val &&
                   same(n1.left, n2.left) &&
                   same(n1.right, n2.right)
        }

        dfs(root)

        for i in 0..<subTree.count {
            if seen.contains(ObjectIdentifier(subTree[i])) { continue }
            for j in (i + 1)..<subTree.count {
                if seen.contains(ObjectIdentifier(subTree[j])) { continue }
                if same(subTree[i], subTree[j]) {
                    if !seen.contains(ObjectIdentifier(subTree[i])) {
                        res.append(subTree[i])
                        seen.insert(ObjectIdentifier(subTree[i]))
                    }
                    seen.insert(ObjectIdentifier(subTree[j]))
                }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity: $O(n)$

---

## 2. DFS + Serialization

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def findDuplicateSubtrees(self, root: Optional[TreeNode]) -> List[Optional[TreeNode]]:
        subtrees = defaultdict(list)
        res = []

        def dfs(node):
            if not node:
                return "null"
            s = ",".join([str(node.val), dfs(node.left), dfs(node.right)])
            if len(subtrees[s]) == 1:
                res.append(node)
            subtrees[s].append(node)
            return s

        dfs(root)
        return res
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
public class Solution {
    private Map<String, List<TreeNode>> subtrees;
    private List<TreeNode> res;

    public List<TreeNode> findDuplicateSubtrees(TreeNode root) {
        subtrees = new HashMap<>();
        res = new ArrayList<>();
        dfs(root);
        return res;
    }

    private String dfs(TreeNode node) {
        if (node == null) return "null";
        String s = node.val + "," + dfs(node.left) + "," + dfs(node.right);
        subtrees.putIfAbsent(s, new ArrayList<>());
        if (subtrees.get(s).size() == 1) {
            res.add(node);
        }
        subtrees.get(s).add(node);
        return s;
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
class Solution {
    unordered_map<string, vector<TreeNode*>> subtrees;
    vector<TreeNode*> res;

public:
    vector<TreeNode*> findDuplicateSubtrees(TreeNode* root) {
        dfs(root);
        return res;
    }

private:
    string dfs(TreeNode* node) {
        if (!node) return "null";
        string s = to_string(node->val) + "," + dfs(node->left) + "," + dfs(node->right);
        if (subtrees[s].size() == 1) {
            res.push_back(node);
        }
        subtrees[s].push_back(node);
        return s;
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
class Solution {
    /**
     * @param {TreeNode} root
     * @return {TreeNode[]}
     */
    findDuplicateSubtrees(root) {
        const subtrees = new Map();
        const res = [];

        const dfs = (node) => {
            if (!node) return 'null';
            const s = `${node.val},${dfs(node.left)},${dfs(node.right)}`;
            if (!subtrees.has(s)) {
                subtrees.set(s, []);
            }
            if (subtrees.get(s).length === 1) {
                res.push(node);
            }
            subtrees.get(s).push(node);
            return s;
        };

        dfs(root);
        return res;
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
func findDuplicateSubtrees(root *TreeNode) []*TreeNode {
    subtrees := make(map[string][]*TreeNode)
    res := []*TreeNode{}

    var dfs func(node *TreeNode) string
    dfs = func(node *TreeNode) string {
        if node == nil {
            return "null"
        }
        s := fmt.Sprintf("%d,%s,%s", node.Val, dfs(node.Left), dfs(node.Right))
        if len(subtrees[s]) == 1 {
            res = append(res, node)
        }
        subtrees[s] = append(subtrees[s], node)
        return s
    }

    dfs(root)
    return res
}
```

```kotlin
/**
 * Example:
 * var ti = TreeNode(5)
 * var v = ti.`val`
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun findDuplicateSubtrees(root: TreeNode?): List<TreeNode?> {
        val subtrees = HashMap<String, MutableList<TreeNode>>()
        val res = mutableListOf<TreeNode?>()

        fun dfs(node: TreeNode?): String {
            if (node == null) return "null"
            val s = "${node.`val`},${dfs(node.left)},${dfs(node.right)}"
            subtrees.getOrPut(s) { mutableListOf() }
            if (subtrees[s]!!.size == 1) {
                res.add(node)
            }
            subtrees[s]!!.add(node)
            return s
        }

        dfs(root)
        return res
    }
}
```

```swift
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     public var val: Int
 *     public var left: TreeNode?
 *     public var right: TreeNode?
 *     public init() { self.val = 0; self.left = nil; self.right = nil; }
 *     public init(_ val: Int) { self.val = val; self.left = nil; self.right = nil; }
 *     public init(_ val: Int, _ left: TreeNode?, _ right: TreeNode?) {
 *         self.val = val
 *         self.left = left
 *         self.right = right
 *     }
 * }
 */
class Solution {
    func findDuplicateSubtrees(_ root: TreeNode?) -> [TreeNode?] {
        var subtrees = [String: [TreeNode]]()
        var res = [TreeNode?]()

        func dfs(_ node: TreeNode?) -> String {
            guard let node = node else { return "null" }
            let s = "\(node.val),\(dfs(node.left)),\(dfs(node.right))"
            if subtrees[s] == nil {
                subtrees[s] = []
            }
            if subtrees[s]!.count == 1 {
                res.append(node)
            }
            subtrees[s]!.append(node)
            return s
        }

        dfs(root)
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 3. Depth First Search (Optimal)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def findDuplicateSubtrees(self, root: Optional[TreeNode]) -> List[Optional[TreeNode]]:
        id_map = {}
        count = defaultdict(int)
        res = []

        def dfs(node):
            if not node:
                return -1
            cur = (dfs(node.left), node.val, dfs(node.right))
            if cur not in id_map:
                id_map[cur] = len(id_map) + 1

            curId = id_map[cur]
            if count[curId] == 1:
                res.append(node)
            count[curId] += 1
            return curId

        dfs(root)
        return res
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
public class Solution {
    private Map<String, Integer> idMap;
    private Map<Integer, Integer> count;
    private List<TreeNode> res;

    public List<TreeNode> findDuplicateSubtrees(TreeNode root) {
        idMap = new HashMap<>();
        count = new HashMap<>();
        res = new ArrayList<>();

        dfs(root);
        return res;
    }

    private int dfs(TreeNode node) {
        if (node == null) return -1;
        String cur = dfs(node.left) + "," + node.val + "," + dfs(node.right);
        idMap.putIfAbsent(cur, idMap.size());
        int curId = idMap.get(cur);
        count.put(curId, count.getOrDefault(curId, 0) + 1);
        if (count.get(curId) == 2) {
            res.add(node);
        }
        return curId;
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
class Solution {
    unordered_map<string, int> idMap;
    unordered_map<int, int> count;
    vector<TreeNode*> res;

public:
    vector<TreeNode*> findDuplicateSubtrees(TreeNode* root) {
        dfs(root);
        return res;
    }

private:
    int dfs(TreeNode* node) {
        if (!node) return -1;
        string cur = to_string(dfs(node->left)) + "," +
                     to_string(node->val) + "," +
                     to_string(dfs(node->right));
        if (idMap.find(cur) == idMap.end()) {
            idMap[cur] = idMap.size();
        }
        int curId = idMap[cur];
        count[curId]++;
        if (count[curId] == 2) {
            res.push_back(node);
        }
        return curId;
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
class Solution {
    /**
     * @param {TreeNode} root
     * @return {TreeNode[]}
     */
    findDuplicateSubtrees(root) {
        const idMap = new Map();
        const count = new Map();
        const res = [];

        const dfs = (node) => {
            if (!node) return -1;

            const cur = `${dfs(node.left)},${node.val},${dfs(node.right)}`;
            if (!idMap.has(cur)) {
                idMap.set(cur, idMap.size + 1);
            }

            const curId = idMap.get(cur);
            count.set(curId, (count.get(curId) || 0) + 1);
            if (count.get(curId) === 2) {
                res.push(node);
            }

            return curId;
        };

        dfs(root);
        return res;
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
func findDuplicateSubtrees(root *TreeNode) []*TreeNode {
    idMap := make(map[string]int)
    count := make(map[int]int)
    res := []*TreeNode{}

    var dfs func(node *TreeNode) int
    dfs = func(node *TreeNode) int {
        if node == nil {
            return -1
        }
        cur := fmt.Sprintf("%d,%d,%d", dfs(node.Left), node.Val, dfs(node.Right))
        if _, exists := idMap[cur]; !exists {
            idMap[cur] = len(idMap) + 1
        }
        curId := idMap[cur]
        count[curId]++
        if count[curId] == 2 {
            res = append(res, node)
        }
        return curId
    }

    dfs(root)
    return res
}
```

```kotlin
/**
 * Example:
 * var ti = TreeNode(5)
 * var v = ti.`val`
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun findDuplicateSubtrees(root: TreeNode?): List<TreeNode?> {
        val idMap = HashMap<String, Int>()
        val count = HashMap<Int, Int>()
        val res = mutableListOf<TreeNode?>()

        fun dfs(node: TreeNode?): Int {
            if (node == null) return -1
            val cur = "${dfs(node.left)},${node.`val`},${dfs(node.right)}"
            idMap.putIfAbsent(cur, idMap.size + 1)
            val curId = idMap[cur]!!
            count[curId] = count.getOrDefault(curId, 0) + 1
            if (count[curId] == 2) {
                res.add(node)
            }
            return curId
        }

        dfs(root)
        return res
    }
}
```

```swift
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     public var val: Int
 *     public var left: TreeNode?
 *     public var right: TreeNode?
 *     public init() { self.val = 0; self.left = nil; self.right = nil; }
 *     public init(_ val: Int) { self.val = val; self.left = nil; self.right = nil; }
 *     public init(_ val: Int, _ left: TreeNode?, _ right: TreeNode?) {
 *         self.val = val
 *         self.left = left
 *         self.right = right
 *     }
 * }
 */
class Solution {
    func findDuplicateSubtrees(_ root: TreeNode?) -> [TreeNode?] {
        var idMap = [String: Int]()
        var count = [Int: Int]()
        var res = [TreeNode?]()

        func dfs(_ node: TreeNode?) -> Int {
            guard let node = node else { return -1 }
            let cur = "\(dfs(node.left)),\(node.val),\(dfs(node.right))"
            if idMap[cur] == nil {
                idMap[cur] = idMap.count + 1
            }
            let curId = idMap[cur]!
            count[curId, default: 0] += 1
            if count[curId] == 2 {
                res.append(node)
            }
            return curId
        }

        dfs(root)
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
