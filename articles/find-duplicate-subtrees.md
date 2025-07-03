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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
