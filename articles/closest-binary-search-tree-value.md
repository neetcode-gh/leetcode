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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(H)$
- Space complexity: $O(1)$

>  Where $H$ is the height of the tree.
