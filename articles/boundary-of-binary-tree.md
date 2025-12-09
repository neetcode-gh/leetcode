## 1. Simple Solution

::tabs-start

```python
class Solution:
    def isLeaf(self, t: Optional[TreeNode]) -> bool:
        return t.left is None and t.right is None
    
    def addLeaves(self, res: List[int], root: Optional[TreeNode]) -> None:
        if self.isLeaf(root):
            res.append(root.val)
        else:
            if root.left is not None:
                self.addLeaves(res, root.left)
            if root.right is not None:
                self.addLeaves(res, root.right)
    
    def boundaryOfBinaryTree(self, root: Optional[TreeNode]) -> List[int]:
        res = []
        if root is None:
            return res
        
        if not self.isLeaf(root):
            res.append(root.val)
        
        t = root.left
        while t is not None:
            if not self.isLeaf(t):
                res.append(t.val)
            if t.left is not None:
                t = t.left
            else:
                t = t.right
        
        self.addLeaves(res, root)
        
        stack = []
        t = root.right
        while t is not None:
            if not self.isLeaf(t):
                stack.append(t.val)
            if t.right is not None:
                t = t.right
            else:
                t = t.left
        
        while stack:
            res.append(stack.pop())
        
        return res
```

```java
class Solution {
    public boolean isLeaf(TreeNode t) {
        return t.left == null && t.right == null;
    }

    public void addLeaves(List<Integer> res, TreeNode root) {
        if (isLeaf(root)) {
            res.add(root.val);
        } else {
            if (root.left != null) {
                addLeaves(res, root.left);
            }
            if (root.right != null) {
                addLeaves(res, root.right);
            }
        }
    }

    public List<Integer> boundaryOfBinaryTree(TreeNode root) {
        ArrayList<Integer> res = new ArrayList<>();

        if (root == null) {
            return res;
        }

        if (!isLeaf(root)) {
            res.add(root.val);
        }

        TreeNode t = root.left;
        while (t != null) {
            if (!isLeaf(t)) {
                res.add(t.val);
            }
            if (t.left != null) {
                t = t.left;
            } else {
                t = t.right;
            }

        }

        addLeaves(res, root);
        
        Stack<Integer> s = new Stack<>();
        t = root.right;
        while (t != null) {
            if (!isLeaf(t)) {
                s.push(t.val);
            }
            if (t.right != null) {
                t = t.right;
            } else {
                t = t.left;
            }
        }
        while (!s.empty()) {
            res.add(s.pop());
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    bool isLeaf(TreeNode* t) {
        return t->left == nullptr && t->right == nullptr;
    }
    
    void addLeaves(vector<int>& res, TreeNode* root) {
        if (isLeaf(root)) {
            res.push_back(root->val);
        } else {
            if (root->left != nullptr) {
                addLeaves(res, root->left);
            }
            if (root->right != nullptr) {
                addLeaves(res, root->right);
            }
        }
    }
    
    vector<int> boundaryOfBinaryTree(TreeNode* root) {
        vector<int> res;
        if (root == nullptr) {
            return res;
        }
        
        if (!isLeaf(root)) {
            res.push_back(root->val);
        }
        
        TreeNode* t = root->left;
        while (t != nullptr) {
            if (!isLeaf(t)) {
                res.push_back(t->val);
            }
            if (t->left != nullptr) {
                t = t->left;
            } else {
                t = t->right;
            }
        }
        
        addLeaves(res, root);
        
        stack<int> s;
        t = root->right;
        while (t != nullptr) {
            if (!isLeaf(t)) {
                s.push(t->val);
            }
            if (t->right != nullptr) {
                t = t->right;
            } else {
                t = t->left;
            }
        }
        
        while (!s.empty()) {
            res.push_back(s.top());
            s.pop();
        }
        
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @return {number[]}
     */
    isLeaf(t) {
        return t.left === null && t.right === null;
    }
    
    addLeaves(res, root) {
        if (this.isLeaf(root)) {
            res.push(root.val);
        } else {
            if (root.left !== null) {
                this.addLeaves(res, root.left);
            }
            if (root.right !== null) {
                this.addLeaves(res, root.right);
            }
        }
    }
    
    boundaryOfBinaryTree(root) {
        const res = [];
        if (root === null) {
            return res;
        }
        
        if (!this.isLeaf(root)) {
            res.push(root.val);
        }
        
        let t = root.left;
        while (t !== null) {
            if (!this.isLeaf(t)) {
                res.push(t.val);
            }
            if (t.left !== null) {
                t = t.left;
            } else {
                t = t.right;
            }
        }

        this.addLeaves(res, root);
        
        const stack = [];
        t = root.right;
        while (t !== null) {
            if (!this.isLeaf(t)) {
                stack.push(t.val);
            }
            if (t.right !== null) {
                t = t.right;
            } else {
                t = t.left;
            }
        }
        
        while (stack.length > 0) {
            res.push(stack.pop());
        }
        
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the number of nodes in the tree

---

## 2. Using PreOrder Traversal 

::tabs-start

```python
class Solution:
    def boundaryOfBinaryTree(self, root: Optional[TreeNode]) -> List[int]:
        left_boundary, right_boundary, leaves = [], [], []
        self.preorder(root, left_boundary, right_boundary, leaves, 0)
        left_boundary.extend(leaves)
        left_boundary.extend(right_boundary)
        return left_boundary
    
    def is_leaf(self, cur):
        return cur.left is None and cur.right is None
    
    def is_right_boundary(self, flag):
        return flag == 2
    
    def is_left_boundary(self, flag):
        return flag == 1
    
    def is_root(self, flag):
        return flag == 0
    
    def left_child_flag(self, cur, flag):
        if self.is_left_boundary(flag) or self.is_root(flag):
            return 1
        elif self.is_right_boundary(flag) and cur.right is None:
            return 2
        else:
            return 3
    
    def right_child_flag(self, cur, flag):
        if self.is_right_boundary(flag) or self.is_root(flag):
            return 2
        elif self.is_left_boundary(flag) and cur.left is None:
            return 1
        else:
            return 3
    
    def preorder(self, cur, left_boundary, right_boundary, leaves, flag):
        if cur is None:
            return
        
        if self.is_right_boundary(flag):
            right_boundary.insert(0, cur.val)
        elif self.is_left_boundary(flag) or self.is_root(flag):
            left_boundary.append(cur.val)
        elif self.is_leaf(cur):
            leaves.append(cur.val)
            
        self.preorder(cur.left, left_boundary, right_boundary, leaves, self.left_child_flag(cur, flag))
        self.preorder(cur.right, left_boundary, right_boundary, leaves, self.right_child_flag(cur, flag))
```

```java
class Solution {
    public List < Integer > boundaryOfBinaryTree(TreeNode root) {
        List < Integer > left_boundary = new LinkedList < > (), right_boundary = new LinkedList < > (), leaves = new LinkedList < > ();
        preorder(root, left_boundary, right_boundary, leaves, 0);
        left_boundary.addAll(leaves);
        left_boundary.addAll(right_boundary);
        return left_boundary;
    }

    public boolean isLeaf(TreeNode cur) {
        return (cur.left == null && cur.right == null);
    }

    public boolean isRightBoundary(int flag) {
        return (flag == 2);
    }

    public boolean isLeftBoundary(int flag) {
        return (flag == 1);
    }

    public boolean isRoot(int flag) {
        return (flag == 0);
    }

    public int leftChildFlag(TreeNode cur, int flag) {
        if (isLeftBoundary(flag) || isRoot(flag))
            return 1;
        else if (isRightBoundary(flag) && cur.right == null)
            return 2;
        else return 3;
    }

    public int rightChildFlag(TreeNode cur, int flag) {
        if (isRightBoundary(flag) || isRoot(flag))
            return 2;
        else if (isLeftBoundary(flag) && cur.left == null)
            return 1;
        else return 3;
    }

    public void preorder(TreeNode cur, List < Integer > left_boundary, List < Integer > right_boundary, List < Integer > leaves, int flag) {
        if (cur == null)
            return;

        if (isRightBoundary(flag))
            right_boundary.add(0, cur.val);
        else if (isLeftBoundary(flag) || isRoot(flag))
            left_boundary.add(cur.val);
        else if (isLeaf(cur))
            leaves.add(cur.val);

        preorder(cur.left, left_boundary, right_boundary, leaves, leftChildFlag(cur, flag));
        preorder(cur.right, left_boundary, right_boundary, leaves, rightChildFlag(cur, flag));
    }
}
```

```cpp
class Solution {
public:
    vector<int> boundaryOfBinaryTree(TreeNode* root) {
        vector<int> left_boundary, right_boundary, leaves;
        preorder(root, left_boundary, right_boundary, leaves, 0);
        left_boundary.insert(left_boundary.end(), leaves.begin(), leaves.end());
        left_boundary.insert(left_boundary.end(), right_boundary.begin(), right_boundary.end());
        return left_boundary;
    }
    
private:
    bool isLeaf(TreeNode* cur) {
        return cur->left == nullptr && cur->right == nullptr;
    }
    
    bool isRightBoundary(int flag) {
        return flag == 2;
    }
    
    bool isLeftBoundary(int flag) {
        return flag == 1;
    }
    
    bool isRoot(int flag) {
        return flag == 0;
    }
    
    int leftChildFlag(TreeNode* cur, int flag) {
        if (isLeftBoundary(flag) || isRoot(flag)) {
            return 1;
        } else if (isRightBoundary(flag) && cur->right == nullptr) {
            return 2;
        } else {
            return 3;
        }
    }
    
    int rightChildFlag(TreeNode* cur, int flag) {
        if (isRightBoundary(flag) || isRoot(flag)) {
            return 2;
        } else if (isLeftBoundary(flag) && cur->left == nullptr) {
            return 1;
        } else {
            return 3;
        }
    }
    
    void preorder(TreeNode* cur, vector<int>& left_boundary, vector<int>& right_boundary, vector<int>& leaves, int flag) {
        if (cur == nullptr) {
            return;
        }

        if (isRightBoundary(flag)) {
            right_boundary.insert(right_boundary.begin(), cur->val);
        } else if (isLeftBoundary(flag) || isRoot(flag)) {
            left_boundary.push_back(cur->val);
        } else if (isLeaf(cur)) {
            leaves.push_back(cur->val);
        }
        
        preorder(cur->left, left_boundary, right_boundary, leaves, leftChildFlag(cur, flag));
        preorder(cur->right, left_boundary, right_boundary, leaves, rightChildFlag(cur, flag));
    }
};
```

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @return {number[]}
     */
    boundaryOfBinaryTree(root) {
        const left_boundary = [], right_boundary = [], leaves = [];
        this.preorder(root, left_boundary, right_boundary, leaves, 0);
        left_boundary.push(...leaves);
        left_boundary.push(...right_boundary);
        return left_boundary;
    }
    
    isLeaf(cur) {
        return cur.left === null && cur.right === null;
    }
    
    isRightBoundary(flag) {
        return flag === 2;
    }
    
    isLeftBoundary(flag) {
        return flag === 1;
    }
    
    isRoot(flag) {
        return flag === 0;
    }
    
    leftChildFlag(cur, flag) {
        if (this.isLeftBoundary(flag) || this.isRoot(flag)) {
            return 1;
        } else if (this.isRightBoundary(flag) && cur.right === null) {
            return 2;
        } else {
            return 3;
        }
    }
    
    rightChildFlag(cur, flag) {
        if (this.isRightBoundary(flag) || this.isRoot(flag)) {
            return 2;
        } else if (this.isLeftBoundary(flag) && cur.left === null) {
            return 1;
        } else {
            return 3;
        }
    }
    
    preorder(cur, left_boundary, right_boundary, leaves, flag) {
        if (cur === null) {
            return;
        }

        if (this.isRightBoundary(flag)) {
            right_boundary.unshift(cur.val);
        } else if (this.isLeftBoundary(flag) || this.isRoot(flag)) {
            left_boundary.push(cur.val);
        } else if (this.isLeaf(cur)) {
            leaves.push(cur.val);
        }
        
        this.preorder(cur.left, left_boundary, right_boundary, leaves, this.leftChildFlag(cur, flag));
        this.preorder(cur.right, left_boundary, right_boundary, leaves, this.rightChildFlag(cur, flag));
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the number of nodes in the tree
