## 1. DFS (Depth-First Search) with sorting

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N \log N)$
- Space complexity: $O(N)$

>  Where $N$ is the total number of nodes in the binary tree

---

## 2. DFS (Depth-First Search) without sorting

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(N)$

>  Where $N$ is the total number of nodes in the binary tree
