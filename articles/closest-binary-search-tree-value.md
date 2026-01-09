## 1. Recursive Inorder + Linear search, O(N) time

::tabs-start

```python
class Solution:
    def closestValue(self, root: TreeNode, target: float) -> int:
        def inorder(r: TreeNode):
            return inorder(r.left) + [r.val] + inorder(r.right) if r else []
        
        return min(inorder(root), key = lambda x: abs(target - x))
```

```java
class Solution {
    public void inorder(TreeNode root, List<Integer> nums) {
        if (root == null) return;
        inorder(root.left, nums);
        nums.add(root.val);
        inorder(root.right, nums);
    }

    public int closestValue(TreeNode root, double target) {
        List<Integer> nums = new ArrayList();
        inorder(root, nums);
        return Collections.min(nums, new Comparator<Integer>() {
            @Override
            public int compare(Integer o1, Integer o2) {
                return Math.abs(o1 - target) < Math.abs(o2 - target) ? -1 : 1;
            }
        });
    }
}
```

```cpp
class Solution {
public:
    int closestValue(TreeNode* root, double target) {
        vector<int> nums;
        inorder(root, nums);
        return *min_element(nums.begin(), nums.end(), [&](int a, int b) {
            return abs(a - target) < abs(b - target);
        });
    }

    void inorder(TreeNode* root, vector<int>& nums) {
        if (!root) return;
        inorder(root->left, nums);
        nums.push_back(root->val);
        inorder(root->right, nums);
    }
};
```

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @param {number} target
     * @return {number}
     */
    closestValue(root, target) {
        const nums = [];
        this.inorder(root, nums);
        return nums.reduce((closest, val) =>
            Math.abs(val - target) < Math.abs(closest - target) ? val : closest
        );
    }

    inorder(root, nums) {
        if (!root) return;
        this.inorder(root.left, nums);
        nums.push(root.val);
        this.inorder(root.right, nums);
    }
}
```

```csharp
public class Solution {
    public int ClosestValue(TreeNode root, double target) {
        var nums = new List<int>();
        Inorder(root, nums);
        return nums.OrderBy(x => Math.Abs(x - target)).First();
    }

    private void Inorder(TreeNode root, List<int> nums) {
        if (root == null) return;
        Inorder(root.left, nums);
        nums.Add(root.val);
        Inorder(root.right, nums);
    }
}
```

```go
func closestValue(root *TreeNode, target float64) int {
    nums := []int{}
    var inorder func(node *TreeNode)
    inorder = func(node *TreeNode) {
        if node == nil {
            return
        }
        inorder(node.Left)
        nums = append(nums, node.Val)
        inorder(node.Right)
    }
    inorder(root)

    closest := nums[0]
    for _, val := range nums {
        if math.Abs(float64(val)-target) < math.Abs(float64(closest)-target) {
            closest = val
        }
    }
    return closest
}
```

```kotlin
class Solution {
    fun closestValue(root: TreeNode?, target: Double): Int {
        val nums = mutableListOf<Int>()

        fun inorder(node: TreeNode?) {
            if (node == null) return
            inorder(node.left)
            nums.add(node.`val`)
            inorder(node.right)
        }

        inorder(root)
        return nums.minByOrNull { Math.abs(it - target) }!!
    }
}
```

```swift
class Solution {
    func closestValue(_ root: TreeNode?, _ target: Double) -> Int {
        var nums = [Int]()

        func inorder(_ node: TreeNode?) {
            guard let node = node else { return }
            inorder(node.left)
            nums.append(node.val)
            inorder(node.right)
        }

        inorder(root)
        return nums.min(by: { abs(Double($0) - target) < abs(Double($1) - target) })!
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(N)$

>  Where $N$ is the total number of nodes in the binary tree

---

## 2. Iterative Inorder, O(k) time

::tabs-start

```python
class Solution:
    def closestValue(self, root: TreeNode, target: float) -> int:
        stack, pred = [], float('-inf')
        
        while stack or root:
            while root:
                stack.append(root)
                root = root.left
            root = stack.pop()
            
            if pred <= target and target < root.val:
                return min(pred, root.val, key = lambda x: abs(target - x))
                
            pred = root.val
            root = root.right

        return pred
```

```java
class Solution {
    public int closestValue(TreeNode root, double target) {
        LinkedList<TreeNode> stack = new LinkedList();
        long pred = Long.MIN_VALUE;

        while (!stack.isEmpty() || root != null) {
            while (root != null) {
                stack.add(root);
                root = root.left;
            }
            root = stack.removeLast();

            if (pred <= target && target < root.val)
                return Math.abs(pred - target) <= Math.abs(root.val - target) ? (int) pred : root.val;

            pred = root.val;
            root = root.right;
        }
        return (int) pred;
    }
}
```

```cpp
class Solution {
public:
    int closestValue(TreeNode* root, double target) {
        stack<TreeNode*> stk;
        long long pred = LLONG_MIN;

        while (!stk.empty() || root) {
            while (root) {
                stk.push(root);
                root = root->left;
            }
            root = stk.top();
            stk.pop();

            if (pred <= target && target < root->val) {
                return abs(pred - target) <= abs(root->val - target) ? pred : root->val;
            }

            pred = root->val;
            root = root->right;
        }
        return pred;
    }
};
```

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @param {number} target
     * @return {number}
     */
    closestValue(root, target) {
        const stack = [];
        let pred = -Infinity;

        while (stack.length > 0 || root !== null) {
            while (root !== null) {
                stack.push(root);
                root = root.left;
            }
            root = stack.pop();

            if (pred <= target && target < root.val) {
                return Math.abs(pred - target) <= Math.abs(root.val - target) ? pred : root.val;
            }

            pred = root.val;
            root = root.right;
        }
        return pred;
    }
}
```

```csharp
public class Solution {
    public int ClosestValue(TreeNode root, double target) {
        var stack = new Stack<TreeNode>();
        long pred = long.MinValue;

        while (stack.Count > 0 || root != null) {
            while (root != null) {
                stack.Push(root);
                root = root.left;
            }
            root = stack.Pop();

            if (pred <= target && target < root.val) {
                return Math.Abs(pred - target) <= Math.Abs(root.val - target) ? (int)pred : root.val;
            }

            pred = root.val;
            root = root.right;
        }
        return (int)pred;
    }
}
```

```go
func closestValue(root *TreeNode, target float64) int {
    stack := []*TreeNode{}
    pred := math.MinInt64

    for len(stack) > 0 || root != nil {
        for root != nil {
            stack = append(stack, root)
            root = root.Left
        }
        root = stack[len(stack)-1]
        stack = stack[:len(stack)-1]

        if float64(pred) <= target && target < float64(root.Val) {
            if math.Abs(float64(pred)-target) <= math.Abs(float64(root.Val)-target) {
                return pred
            }
            return root.Val
        }

        pred = root.Val
        root = root.Right
    }
    return pred
}
```

```kotlin
class Solution {
    fun closestValue(root: TreeNode?, target: Double): Int {
        val stack = ArrayDeque<TreeNode>()
        var curr = root
        var pred = Long.MIN_VALUE

        while (stack.isNotEmpty() || curr != null) {
            while (curr != null) {
                stack.addLast(curr)
                curr = curr.left
            }
            curr = stack.removeLast()

            if (pred <= target && target < curr.`val`) {
                return if (Math.abs(pred - target) <= Math.abs(curr.`val` - target)) pred.toInt() else curr.`val`
            }

            pred = curr.`val`.toLong()
            curr = curr.right
        }
        return pred.toInt()
    }
}
```

```swift
class Solution {
    func closestValue(_ root: TreeNode?, _ target: Double) -> Int {
        var stack = [TreeNode]()
        var curr = root
        var pred = Int.min

        while !stack.isEmpty || curr != nil {
            while curr != nil {
                stack.append(curr!)
                curr = curr?.left
            }
            curr = stack.removeLast()

            if Double(pred) <= target && target < Double(curr!.val) {
                return abs(Double(pred) - target) <= abs(Double(curr!.val) - target) ? pred : curr!.val
            }

            pred = curr!.val
            curr = curr?.right
        }
        return pred
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(k)$ in the average case and $O(H+k)$ in the worst case,
- Space complexity: $O(H)$

>  Where $k$ is an index of the closest element and $H$ is the height of the tree.

---

## 3. Binary Search, O(H) time

::tabs-start

```python
class Solution:
    def closestValue(self, root: TreeNode, target: float) -> int:
        closest = root.val

        while root:
            closest = min(root.val, closest, key = lambda x: (abs(target - x), x))
            root = root.left if target < root.val else root.right

        return closest
```

```java
class Solution {
    public int closestValue(TreeNode root, double target) {
        int val, closest = root.val;

        while (root != null) {
            val = root.val;
            closest = Math.abs(val - target) < Math.abs(closest - target) 
                    || (Math.abs(val - target) == Math.abs(closest - target) && val < closest) ? val : closest;
            root = target < root.val ? root.left : root.right;
        }
        
        return closest;
    }
}
```

```cpp
class Solution {
public:
    int closestValue(TreeNode* root, double target) {
        int val, closest = root->val;

        while (root != nullptr) {
            val = root->val;
            closest = abs(val - target) < abs(closest - target) 
                || (abs(val - target) == abs(closest - target) && val < closest) ? val : closest;
            root = target < root->val ? root->left : root->right;
        }
        
        return closest;
    }
};
```

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @param {number} target
     * @return {number}
     */
    closestValue(root, target) {
        let val, closest = root.val;

        while (root !== null) {
            val = root.val;
            closest = Math.abs(val - target) < Math.abs(closest - target)
                || (Math.abs(val - target) === Math.abs(closest - target) && val < closest) ? val : closest;
            root = target < root.val ? root.left : root.right;
        }

        return closest;
    }
}
```

```csharp
public class Solution {
    public int ClosestValue(TreeNode root, double target) {
        int closest = root.val;

        while (root != null) {
            int val = root.val;
            if (Math.Abs(val - target) < Math.Abs(closest - target) ||
                (Math.Abs(val - target) == Math.Abs(closest - target) && val < closest)) {
                closest = val;
            }
            root = target < root.val ? root.left : root.right;
        }

        return closest;
    }
}
```

```go
func closestValue(root *TreeNode, target float64) int {
    closest := root.Val

    for root != nil {
        val := root.Val
        if math.Abs(float64(val)-target) < math.Abs(float64(closest)-target) ||
            (math.Abs(float64(val)-target) == math.Abs(float64(closest)-target) && val < closest) {
            closest = val
        }
        if target < float64(root.Val) {
            root = root.Left
        } else {
            root = root.Right
        }
    }

    return closest
}
```

```kotlin
class Solution {
    fun closestValue(root: TreeNode?, target: Double): Int {
        var curr = root
        var closest = curr!!.`val`

        while (curr != null) {
            val v = curr.`val`
            if (Math.abs(v - target) < Math.abs(closest - target) ||
                (Math.abs(v - target) == Math.abs(closest - target) && v < closest)) {
                closest = v
            }
            curr = if (target < curr.`val`) curr.left else curr.right
        }

        return closest
    }
}
```

```swift
class Solution {
    func closestValue(_ root: TreeNode?, _ target: Double) -> Int {
        var curr = root
        var closest = curr!.val

        while curr != nil {
            let val = curr!.val
            if abs(Double(val) - target) < abs(Double(closest) - target) ||
               (abs(Double(val) - target) == abs(Double(closest) - target) && val < closest) {
                closest = val
            }
            curr = target < Double(curr!.val) ? curr?.left : curr?.right
        }

        return closest
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(H)$
- Space complexity: $O(1)$

>  Where $H$ is the height of the tree.
