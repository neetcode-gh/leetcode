## 1. Breadth First Search + Sorting

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def verticalOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        cols = defaultdict(list)
        que = deque([(root, 0)])

        while que:
            node, pos = que.popleft()
            if node:
                cols[pos].append(node.val)
                que.append((node.left, pos - 1))
                que.append((node.right, pos + 1))

        return [cols[x] for x in sorted(cols)]
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
    public List<List<Integer>> verticalOrder(TreeNode root) {
        if (root == null) return new ArrayList<>();

        Map<Integer, List<Integer>> cols = new TreeMap<>();
        Queue<Pair<TreeNode, Integer>> queue = new LinkedList<>();
        queue.offer(new Pair<>(root, 0));

        while (!queue.isEmpty()) {
            Pair<TreeNode, Integer> p = queue.poll();
            TreeNode node = p.getKey();
            int pos = p.getValue();

            cols.computeIfAbsent(pos, k -> new ArrayList<>()).add(node.val);

            if (node.left != null) queue.offer(new Pair<>(node.left, pos - 1));
            if (node.right != null) queue.offer(new Pair<>(node.right, pos + 1));
        }

        return new ArrayList<>(cols.values());
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
    vector<vector<int>> verticalOrder(TreeNode* root) {
        if (!root) return {};
        map<int, vector<int>> cols;
        queue<pair<TreeNode*, int>> q;
        q.push({root, 0});

        while (!q.empty()) {
            auto [node, pos] = q.front(); q.pop();
            cols[pos].push_back(node->val);
            if (node->left) q.push({node->left, pos - 1});
            if (node->right) q.push({node->right, pos + 1});
        }

        vector<vector<int>> res;
        for (auto& [_, vec] : cols)
            res.push_back(vec);
        return res;
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
     * @return {number[][]}
     */
    verticalOrder(root) {
        if (!root) return [];

        const cols = new Map();
        const queue = new Queue([[root, 0]]);

        while (!queue.isEmpty()) {
            const [node, pos] = queue.pop();
            if (!cols.has(pos)) cols.set(pos, []);
            cols.get(pos).push(node.val);

            if (node.left) queue.push([node.left, pos - 1]);
            if (node.right) queue.push([node.right, pos + 1]);
        }

        const sortedKeys = Array.from(cols.keys()).sort((a, b) => a - b);
        return sortedKeys.map((k) => cols.get(k));
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
public class Solution {
    public List<List<int>> VerticalOrder(TreeNode root) {
        if (root == null) return new List<List<int>>();

        var cols = new SortedDictionary<int, List<int>>();
        var queue = new Queue<(TreeNode node, int pos)>();
        queue.Enqueue((root, 0));

        while (queue.Count > 0) {
            var (node, pos) = queue.Dequeue();

            if (!cols.ContainsKey(pos))
                cols[pos] = new List<int>();
            cols[pos].Add(node.val);

            if (node.left != null) queue.Enqueue((node.left, pos - 1));
            if (node.right != null) queue.Enqueue((node.right, pos + 1));
        }

        return cols.Values.ToList<List<int>>();
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 2. Depth First Search + Sorting

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def verticalOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        cols = defaultdict(list)

        def dfs(node, row, col):
            if not node:
                return
            cols[col].append((row, node.val))
            dfs(node.left, row + 1, col - 1)
            dfs(node.right, row + 1, col + 1)

        dfs(root, 0, 0)

        res = []
        for col in sorted(cols):
            col_vals = sorted(cols[col], key=lambda x: x[0])
            res.append([val for _, val in col_vals])
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
    private Map<Integer, List<int[]>> cols = new TreeMap<>();

    public List<List<Integer>> verticalOrder(TreeNode root) {
        dfs(root, 0, 0);
        List<List<Integer>> res = new ArrayList<>();

        for (List<int[]> list : cols.values()) {
            list.sort(Comparator.comparingInt(a -> a[0]));
            List<Integer> colVals = new ArrayList<>();
            for (int[] p : list) colVals.add(p[1]);
            res.add(colVals);
        }

        return res;
    }

    private void dfs(TreeNode node, int row, int col) {
        if (node == null) return;
        cols.computeIfAbsent(col, k -> new ArrayList<>()).add(new int[]{row, node.val});
        dfs(node.left, row + 1, col - 1);
        dfs(node.right, row + 1, col + 1);
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
    map<int, vector<pair<int, int>>> cols;

    void dfs(TreeNode* node, int row, int col) {
        if (!node) return;
        cols[col].push_back({row, node->val});
        dfs(node->left, row + 1, col - 1);
        dfs(node->right, row + 1, col + 1);
    }

public:
    vector<vector<int>> verticalOrder(TreeNode* root) {
        dfs(root, 0, 0);
        vector<vector<int>> res;

        for (auto& [col, vec] : cols) {
            stable_sort(vec.begin(), vec.end(),
                        [](const pair<int, int>& a, const pair<int, int>& b) {
                            return a.first < b.first;  // sort ONLY by row
                        });

            vector<int> colVals;
            for (auto& [_, val] : vec)
                colVals.push_back(val);
            res.push_back(colVals);
        }

        return res;
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
     * @return {number[][]}
     */
    verticalOrder(root) {
        const cols = new Map();

        const dfs = (node, row, col) => {
            if (!node) return;
            if (!cols.has(col)) cols.set(col, []);
            cols.get(col).push([row, node.val]);
            dfs(node.left, row + 1, col - 1);
            dfs(node.right, row + 1, col + 1);
        };

        dfs(root, 0, 0);

        const sortedCols = Array.from(cols.entries()).sort(
            (a, b) => a[0] - b[0],
        );
        return sortedCols.map(([_, vec]) =>
            vec.sort((a, b) => a[0] - b[0]).map(([_, val]) => val),
        );
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
public class Solution {
    private SortedDictionary<int, List<(int, int)>> cols = new();

    public List<List<int>> VerticalOrder(TreeNode root) {
        DFS(root, 0, 0);

        List<List<int>> res = new();
        foreach (var entry in cols) {
            var list = entry.Value.OrderBy(x => x.Item1).Select(x => x.Item2).ToList();
            res.Add(list);
        }

        return res;
    }

    private void DFS(TreeNode node, int row, int col) {
        if (node == null) return;
        if (!cols.ContainsKey(col)) cols[col] = new List<(int, int)>();
        cols[col].Add((row, node.val));
        DFS(node.left, row + 1, col - 1);
        DFS(node.right, row + 1, col + 1);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n \log n)$

---

## 3. Breadth First Search (Optimal)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def verticalOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root:
            return []

        cols = defaultdict(list)
        queue = deque([(root, 0)])
        minCol = maxCol = 0

        while queue:
            node, col = queue.popleft()
            cols[col].append(node.val)
            minCol = min(minCol, col)
            maxCol = max(maxCol, col)

            if node.left:
                queue.append((node.left, col - 1))
            if node.right:
                queue.append((node.right, col + 1))

        return [cols[c] for c in range(minCol, maxCol + 1)]
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
    public List<List<Integer>> verticalOrder(TreeNode root) {
        if (root == null) return new ArrayList<>();

        Map<Integer, List<Integer>> cols = new HashMap<>();
        Queue<Pair<TreeNode, Integer>> queue = new LinkedList<>();
        queue.offer(new Pair<>(root, 0));
        int minCol = 0, maxCol = 0;

        while (!queue.isEmpty()) {
            Pair<TreeNode, Integer> p = queue.poll();
            TreeNode node = p.getKey();
            int col = p.getValue();

            cols.computeIfAbsent(col, x -> new ArrayList<>()).add(node.val);
            minCol = Math.min(minCol, col);
            maxCol = Math.max(maxCol, col);

            if (node.left != null) queue.offer(new Pair<>(node.left, col - 1));
            if (node.right != null) queue.offer(new Pair<>(node.right, col + 1));
        }

        List<List<Integer>> res = new ArrayList<>();
        for (int c = minCol; c <= maxCol; c++) {
            res.add(cols.get(c));
        }
        return res;
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
    vector<vector<int>> verticalOrder(TreeNode* root) {
        if (!root) return {};

        unordered_map<int, vector<int>> cols;
        queue<pair<TreeNode*, int>> q;
        q.push({root, 0});
        int minCol = 0, maxCol = 0;

        while (!q.empty()) {
            auto [node, col] = q.front(); q.pop();
            cols[col].push_back(node->val);
            minCol = min(minCol, col);
            maxCol = max(maxCol, col);

            if (node->left) q.push({node->left, col - 1});
            if (node->right) q.push({node->right, col + 1});
        }

        vector<vector<int>> res;
        for (int c = minCol; c <= maxCol; ++c)
            res.push_back(cols[c]);

        return res;
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
     * @return {number[][]}
     */
    verticalOrder(root) {
        if (!root) return [];

        const cols = new Map();
        const queue = new Queue([[root, 0]]);
        let minCol = 0,
            maxCol = 0;

        while (!queue.isEmpty()) {
            const [node, col] = queue.pop();
            if (!cols.has(col)) cols.set(col, []);
            cols.get(col).push(node.val);
            minCol = Math.min(minCol, col);
            maxCol = Math.max(maxCol, col);

            if (node.left) queue.push([node.left, col - 1]);
            if (node.right) queue.push([node.right, col + 1]);
        }

        const res = [];
        for (let c = minCol; c <= maxCol; c++) {
            res.push(cols.get(c));
        }
        return res;
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
public class Solution {
    public List<List<int>> VerticalOrder(TreeNode root) {
        if (root == null) return new List<List<int>>();

        Dictionary<int, List<int>> cols = new();
        Queue<(TreeNode node, int col)> queue = new();
        queue.Enqueue((root, 0));
        int minCol = 0, maxCol = 0;

        while (queue.Count > 0) {
            var (node, col) = queue.Dequeue();
            if (!cols.ContainsKey(col))
                cols[col] = new List<int>();
            cols[col].Add(node.val);
            minCol = Math.Min(minCol, col);
            maxCol = Math.Max(maxCol, col);

            if (node.left != null) queue.Enqueue((node.left, col - 1));
            if (node.right != null) queue.Enqueue((node.right, col + 1));
        }

        var res = new List<List<int>>();
        for (int c = minCol; c <= maxCol; c++) {
            res.Add(cols[c]);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Depth First Search (Optimal)

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def verticalOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root:
            return []

        cols = defaultdict(list)
        minCol = maxCol = 0

        def dfs(node, row, col):
            nonlocal minCol, maxCol
            if not node:
                return
            cols[col].append((row, node.val))
            minCol = min(minCol, col)
            maxCol = max(maxCol, col)
            dfs(node.left, row + 1, col - 1)
            dfs(node.right, row + 1, col + 1)

        dfs(root, 0, 0)

        res = []
        for c in range(minCol, maxCol + 1):
            # sort by row only
            col_vals = sorted(cols[c], key=lambda x: x[0])
            res.append([val for _, val in col_vals])
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
    private Map<Integer, List<int[]>> cols = new HashMap<>();
    private int minCol = 0, maxCol = 0;

    public List<List<Integer>> verticalOrder(TreeNode root) {
        if (root == null) return new ArrayList<>();
        dfs(root, 0, 0);

        List<List<Integer>> res = new ArrayList<>();
        for (int c = minCol; c <= maxCol; c++) {
            List<int[]> list = cols.getOrDefault(c, new ArrayList<>());
            list.sort(Comparator.comparingInt(a -> a[0])); // sort by row
            List<Integer> colVals = new ArrayList<>();
            for (int[] p : list) colVals.add(p[1]);
            res.add(colVals);
        }
        return res;
    }

    private void dfs(TreeNode node, int row, int col) {
        if (node == null) return;
        cols.computeIfAbsent(col, k -> new ArrayList<>()).add(new int[]{row, node.val});
        minCol = Math.min(minCol, col);
        maxCol = Math.max(maxCol, col);
        dfs(node.left, row + 1, col - 1);
        dfs(node.right, row + 1, col + 1);
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
    unordered_map<int, vector<pair<int, int>>> cols;
    int minCol = 0, maxCol = 0;

    void dfs(TreeNode* node, int row, int col) {
        if (!node) return;
        cols[col].emplace_back(row, node->val);
        minCol = min(minCol, col);
        maxCol = max(maxCol, col);
        dfs(node->left, row + 1, col - 1);
        dfs(node->right, row + 1, col + 1);
    }

public:
    vector<vector<int>> verticalOrder(TreeNode* root) {
        if (!root) return {};
        dfs(root, 0, 0);
        vector<vector<int>> res;

        for (int c = minCol; c <= maxCol; ++c) {
            auto& vec = cols[c];
            stable_sort(vec.begin(), vec.end(),
                        [](const pair<int, int>& a, const pair<int, int>& b) {
                            return a.first < b.first; // sort by row only
                        });
            vector<int> colVals;
            for (auto& [_, val] : vec)
                colVals.push_back(val);
            res.push_back(colVals);
        }

        return res;
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
     * @return {number[][]}
     */
    verticalOrder(root) {
        if (!root) return [];

        const cols = new Map();
        let minCol = 0,
            maxCol = 0;

        const dfs = (node, row, col) => {
            if (!node) return;
            if (!cols.has(col)) cols.set(col, []);
            cols.get(col).push([row, node.val]);
            minCol = Math.min(minCol, col);
            maxCol = Math.max(maxCol, col);
            dfs(node.left, row + 1, col - 1);
            dfs(node.right, row + 1, col + 1);
        };

        dfs(root, 0, 0);

        const res = [];
        for (let c = minCol; c <= maxCol; c++) {
            let entries = cols.get(c) || [];
            entries.sort((a, b) => a[0] - b[0]); // sort by row only
            res.push(entries.map(([_, val]) => val));
        }

        return res;
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
public class Solution {
    private Dictionary<int, List<(int, int)>> cols = new();
    private int minCol = 0, maxCol = 0;

    public List<List<int>> VerticalOrder(TreeNode root) {
        if (root == null) return new List<List<int>>();
        DFS(root, 0, 0);
        var res = new List<List<int>>();

        for (int c = minCol; c <= maxCol; c++) {
            var list = cols.ContainsKey(c) ? cols[c] : new List<(int, int)>();
            list.Sort((a, b) => a.Item1.CompareTo(b.Item1)); // sort by row
            res.Add(list.Select(p => p.Item2).ToList());
        }

        return res;
    }

    private void DFS(TreeNode node, int row, int col) {
        if (node == null) return;
        if (!cols.ContainsKey(col)) cols[col] = new List<(int, int)>();
        cols[col].Add((row, node.val));
        minCol = Math.Min(minCol, col);
        maxCol = Math.Max(maxCol, col);
        DFS(node.left, row + 1, col - 1);
        DFS(node.right, row + 1, col + 1);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(w * h \log h)$
- Space complexity: $O(n)$

> Where $n$ is the number of nodes, $h$ is the height of the tree (i.e. maximum number of nodes in any vertical line of the tree), and $w$ is the width of the tree (i.e. maximum number of nodes in any of the levels of the tree).
