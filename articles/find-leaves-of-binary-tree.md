## 1. DFS (Depth-First Search) with sorting

### Intuition

Leaves are nodes with no children, and they have height `0`. Their parents have height `1`, and so on. If we compute the height of each node (where height is the distance to the farthest leaf in its subtree), nodes with the same height should be grouped together. By collecting all (height, value) pairs and sorting by height, we can form the required groups.

### Algorithm

1. Perform a DFS to compute the height of each node.
2. For each node, calculate its height as `max(leftHeight, rightHeight) + 1`, where leaf nodes return `-1` from `null` children.
3. Store each (height, value) pair in a list.
4. Sort the list by height.
5. Group nodes with the same height into sublists and return the result.

::tabs-start

```python
class Solution:
    def findLeaves(self, root: Optional[TreeNode]) -> List[List[int]]:
        self.pairs = []
        
        def getHeight(node):
            if node is None:
                return -1
            
            # first calculate the height of the left and right children
            leftHeight = getHeight(node.left)
            rightHeight = getHeight(node.right)
            
            # based on the height of the left and right children, obtain the height of the current (parent) node
            currHeight = max(leftHeight, rightHeight) + 1
            
            # collect the pair -> (height, val)
            self.pairs.append((currHeight, node.val))
            
            # return the height of the current node
            return currHeight
        
        getHeight(root)
        
        # sort all the (height, val) pairs
        self.pairs.sort(key=lambda p: p[0])
        
        n = len(self.pairs)
        height = 0
        i = 0
        solution = []
        
        while i < n:
            nums = []
            while i < n and self.pairs[i][0] == height:
                nums.append(self.pairs[i][1])
                i += 1
            solution.append(nums)
            height += 1
        
        return solution
```

```java
class Solution {
    private List<Pair<Integer, Integer>> pairs;
    
    private int getHeight(TreeNode root) {
        if (root == null) return -1;
        
        // first calculate the height of the left and right children
        int leftHeight = getHeight(root.left);
        int rightHeight = getHeight(root.right);
        
        // based on the height of the left and right children, obtain the height of the current (parent) node
        int currHeight = Math.max(leftHeight, rightHeight) + 1;

        // collect the pair -> (height, val)
        this.pairs.add(new Pair<Integer, Integer>(currHeight, root.val));

        // return the height of the current node
        return currHeight;
    }
    
    public List<List<Integer>> findLeaves(TreeNode root) {
        this.pairs = new ArrayList<>();
        
        getHeight(root);
        
        // sort all the (height, val) pairs
        Collections.sort(this.pairs, Comparator.comparing(p -> p.getKey()));
        
        int n = this.pairs.size(), height = 0, i = 0;

        List<List<Integer>> solution = new ArrayList<>();
        
        while (i < n) {
            List<Integer> nums = new ArrayList<>();
            while (i < n && this.pairs.get(i).getKey() == height) {
                nums.add(this.pairs.get(i).getValue());
                i++;
            }
            solution.add(nums);
            height++;
        }
        return solution;
    }
}
```

```cpp
class Solution {
public:
    
    vector<pair<int, int>> pairs;
    
    int getHeight(TreeNode *root) {
        
        // return -1 for null nodes
        if (!root) return -1;
        
        // first calculate the height of the left and right children
        int leftHeight = getHeight(root->left);
        int rightHeight = getHeight(root->right);
        
        // based on the height of the left and right children, obtain the height of the current (parent) node
        int currHeight = max(leftHeight, rightHeight) + 1;
        
        // collect the pair -> (height, val)
        this->pairs.push_back({currHeight, root->val});
        
        // return the height of the current node
        return currHeight;
    }
    
    vector<vector<int>> findLeaves(TreeNode* root) {
        this->pairs.clear();
        
        getHeight(root);
        
        // sort all the (height, val) pairs
        sort(this->pairs.begin(), this->pairs.end());
        
        int n = this->pairs.size(), height = 0, i = 0;
        vector<vector<int>> solution;
        while (i < n) {
            vector<int> nums;
            while (i < n && this->pairs[i].first == height) {
                nums.push_back(this->pairs[i].second);
                i++;
            }
            solution.push_back(nums);
            height++;
        }
        return solution;
    }
};
```

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @return {number[][]}
     */
    findLeaves(root) {
        this.pairs = [];

        const getHeight = (node) => {
            if (node === null) {
                return -1;
            }

            // first calculate the height of the left and right children
            const leftHeight = getHeight(node.left);
            const rightHeight = getHeight(node.right);

            // based on the height of the left and right children, obtain the height of the current (parent) node
            const currHeight = Math.max(leftHeight, rightHeight) + 1;

            // collect the pair -> (height, val)
            this.pairs.push([currHeight, node.val]);

            // return the height of the current node
            return currHeight;
        };

        getHeight(root);

        // sort all the (height, val) pairs
        this.pairs.sort((a, b) => a[0] - b[0]);

        const n = this.pairs.length;
        let height = 0;
        let i = 0;
        const solution = [];

        while (i < n) {
            const nums = [];
            while (i < n && this.pairs[i][0] === height) {
                nums.push(this.pairs[i][1]);
                i++;
            }
            solution.push(nums);
            height++;
        }

        return solution;
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
    private List<(int height, int val)> pairs;

    public IList<IList<int>> FindLeaves(TreeNode root) {
        pairs = new List<(int, int)>();
        GetHeight(root);

        // sort all the (height, val) pairs
        pairs.Sort((a, b) => a.height.CompareTo(b.height));

        int n = pairs.Count;
        int height = 0;
        int i = 0;
        var solution = new List<IList<int>>();

        while (i < n) {
            var nums = new List<int>();
            while (i < n && pairs[i].height == height) {
                nums.Add(pairs[i].val);
                i++;
            }
            solution.Add(nums);
            height++;
        }

        return solution;
    }

    private int GetHeight(TreeNode root) {
        if (root == null) return -1;

        // first calculate the height of the left and right children
        int leftHeight = GetHeight(root.left);
        int rightHeight = GetHeight(root.right);

        // based on the height of the left and right children, obtain the height of the current (parent) node
        int currHeight = Math.Max(leftHeight, rightHeight) + 1;

        // collect the pair -> (height, val)
        pairs.Add((currHeight, root.val));

        // return the height of the current node
        return currHeight;
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
func findLeaves(root *TreeNode) [][]int {
    pairs := [][]int{}

    var getHeight func(node *TreeNode) int
    getHeight = func(node *TreeNode) int {
        if node == nil {
            return -1
        }

        leftHeight := getHeight(node.Left)
        rightHeight := getHeight(node.Right)

        currHeight := max(leftHeight, rightHeight) + 1
        pairs = append(pairs, []int{currHeight, node.Val})

        return currHeight
    }

    getHeight(root)

    sort.Slice(pairs, func(i, j int) bool {
        return pairs[i][0] < pairs[j][0]
    })

    n := len(pairs)
    height := 0
    i := 0
    solution := [][]int{}

    for i < n {
        nums := []int{}
        for i < n && pairs[i][0] == height {
            nums = append(nums, pairs[i][1])
            i++
        }
        solution = append(solution, nums)
        height++
    }

    return solution
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
    fun findLeaves(root: TreeNode?): List<List<Int>> {
        val pairs = mutableListOf<Pair<Int, Int>>()

        fun getHeight(node: TreeNode?): Int {
            if (node == null) return -1

            val leftHeight = getHeight(node.left)
            val rightHeight = getHeight(node.right)

            val currHeight = maxOf(leftHeight, rightHeight) + 1
            pairs.add(Pair(currHeight, node.`val`))

            return currHeight
        }

        getHeight(root)
        pairs.sortBy { it.first }

        val n = pairs.size
        var height = 0
        var i = 0
        val solution = mutableListOf<List<Int>>()

        while (i < n) {
            val nums = mutableListOf<Int>()
            while (i < n && pairs[i].first == height) {
                nums.add(pairs[i].second)
                i++
            }
            solution.add(nums)
            height++
        }

        return solution
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
    func findLeaves(_ root: TreeNode?) -> [[Int]] {
        var pairs = [(Int, Int)]()

        func getHeight(_ node: TreeNode?) -> Int {
            guard let node = node else { return -1 }

            let leftHeight = getHeight(node.left)
            let rightHeight = getHeight(node.right)

            let currHeight = max(leftHeight, rightHeight) + 1
            pairs.append((currHeight, node.val))

            return currHeight
        }

        getHeight(root)
        pairs.sort { $0.0 < $1.0 }

        let n = pairs.count
        var height = 0
        var i = 0
        var solution = [[Int]]()

        while i < n {
            var nums = [Int]()
            while i < n && pairs[i].0 == height {
                nums.append(pairs[i].1)
                i += 1
            }
            solution.append(nums)
            height += 1
        }

        return solution
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N \log N)$
- Space complexity: $O(N)$

>  Where $N$ is the total number of nodes in the binary tree

---

## 2. DFS (Depth-First Search) without sorting

### Intuition

Instead of collecting pairs and sorting, we can directly place each node into the correct group during the DFS. When we compute a node's height, we use that height as an index into the result list. If the list doesn't have enough sublists yet, we create a new one.

### Algorithm

1. Initialize an empty result list.
2. Perform a DFS to compute the height of each node:
   - If the node is `null`, return `-1`.
   - Recursively get the heights of left and right children.
   - Compute current height as `max(leftHeight, rightHeight) + 1`.
   - If the result list size equals the current height, append a new empty sublist.
   - Add the node's value to `result[currentHeight]`.
   - Return the current height.
3. Call DFS on the root and return the result.

::tabs-start

```python
class Solution:
    def findLeaves(self, root: Optional[TreeNode]) -> List[List[int]]:
        self.solution = []
        
        def getHeight(node):
            if node is None:
                return -1
            
            leftHeight = getHeight(node.left)
            rightHeight = getHeight(node.right)
            currHeight = max(leftHeight, rightHeight) + 1
            
            if len(self.solution) == currHeight:
                self.solution.append([])
            
            self.solution[currHeight].append(node.val)
            return currHeight
        
        getHeight(root)
        return self.solution
```

```java
class Solution {
    
    private List<List<Integer>> solution;
    
    private int getHeight(TreeNode root) {
        if (root == null) {
            return -1;
        }

        int leftHeight = getHeight(root.left);
        int rightHeight = getHeight(root.right);
        
        int currHeight = Math.max(leftHeight, rightHeight) + 1;
        
        if (this.solution.size() == currHeight) {
            this.solution.add(new ArrayList<>());
        }
        
        this.solution.get(currHeight).add(root.val);
        
        return currHeight;
    }
    
    public List<List<Integer>> findLeaves(TreeNode root) {
        this.solution = new ArrayList<>();
        
        getHeight(root);
        
        return this.solution;
    }
}
```

```cpp
class Solution {
private:

    vector<vector<int>> solution;

public:
    
    int getHeight(TreeNode *root) {
        
        if (!root) {
            return -1;
        }

        int leftHeight = getHeight(root->left);
        int rightHeight = getHeight(root->right);

        int currHeight = max(leftHeight, rightHeight) + 1;
        
        if (this->solution.size() == currHeight) {
            this->solution.push_back({});
        }

        this->solution[currHeight].push_back(root->val);
        
        return currHeight;
    }
    
    vector<vector<int>> findLeaves(TreeNode* root) {
        this->solution.clear();
        
        getHeight(root);
        
        return this->solution;
    }
};
```

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @return {number[][]}
     */
    findLeaves(root) {
        this.solution = [];

        const getHeight = (node) => {
            if (node === null) {
                return -1;
            }

            const leftHeight = getHeight(node.left);
            const rightHeight = getHeight(node.right);
            const currHeight = Math.max(leftHeight, rightHeight) + 1;

            if (this.solution.length === currHeight) {
                this.solution.push([]);
            }

            this.solution[currHeight].push(node.val);
            return currHeight;
        };

        getHeight(root);
        return this.solution;
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
    private List<IList<int>> solution;

    public IList<IList<int>> FindLeaves(TreeNode root) {
        solution = new List<IList<int>>();
        GetHeight(root);
        return solution;
    }

    private int GetHeight(TreeNode root) {
        if (root == null) return -1;

        int leftHeight = GetHeight(root.left);
        int rightHeight = GetHeight(root.right);
        int currHeight = Math.Max(leftHeight, rightHeight) + 1;

        if (solution.Count == currHeight) {
            solution.Add(new List<int>());
        }

        solution[currHeight].Add(root.val);
        return currHeight;
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
func findLeaves(root *TreeNode) [][]int {
    solution := [][]int{}

    var getHeight func(node *TreeNode) int
    getHeight = func(node *TreeNode) int {
        if node == nil {
            return -1
        }

        leftHeight := getHeight(node.Left)
        rightHeight := getHeight(node.Right)
        currHeight := max(leftHeight, rightHeight) + 1

        if len(solution) == currHeight {
            solution = append(solution, []int{})
        }

        solution[currHeight] = append(solution[currHeight], node.Val)
        return currHeight
    }

    getHeight(root)
    return solution
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
    fun findLeaves(root: TreeNode?): List<List<Int>> {
        val solution = mutableListOf<MutableList<Int>>()

        fun getHeight(node: TreeNode?): Int {
            if (node == null) return -1

            val leftHeight = getHeight(node.left)
            val rightHeight = getHeight(node.right)
            val currHeight = maxOf(leftHeight, rightHeight) + 1

            if (solution.size == currHeight) {
                solution.add(mutableListOf())
            }

            solution[currHeight].add(node.`val`)
            return currHeight
        }

        getHeight(root)
        return solution
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
    func findLeaves(_ root: TreeNode?) -> [[Int]] {
        var solution = [[Int]]()

        func getHeight(_ node: TreeNode?) -> Int {
            guard let node = node else { return -1 }

            let leftHeight = getHeight(node.left)
            let rightHeight = getHeight(node.right)
            let currHeight = max(leftHeight, rightHeight) + 1

            if solution.count == currHeight {
                solution.append([])
            }

            solution[currHeight].append(node.val)
            return currHeight
        }

        getHeight(root)
        return solution
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(N)$

>  Where $N$ is the total number of nodes in the binary tree

---

## Common Pitfalls

### Confusing Height with Depth

Height is measured from the node down to its farthest leaf (leaves have height `0`), while depth is measured from the root down to the node. This problem requires height-based grouping, not depth. Using depth would group nodes by their distance from the root, which produces incorrect results since leaves at different depths would end up in different groups.

### Returning Wrong Base Case Value

The base case for `null` nodes should return `-1`, not `0`. Since leaves have height `0` (computed as `max(-1, -1) + 1`), returning `0` for `null` would incorrectly make leaves have height `1`. This off-by-one error shifts all groupings and produces wrong output.

### Forgetting to Handle Result List Growth

When directly inserting nodes into the result list by height index, you must check if the list has enough sublists before accessing `result[height]`. Failing to add a new sublist when `result.size() == height` causes an index out of bounds error. Always ensure the result list grows dynamically as you encounter nodes with new height values.
