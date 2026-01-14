## 1. Depth First Search

### Intuition
To create a height-balanced BST from a sorted array, we need to ensure that for every node, the left and right subtrees have roughly equal heights. Since the array is sorted, the middle element should become the root. All elements before the middle go to the left subtree, and all elements after go to the right subtree. Applying this recursively builds a balanced tree.

### Algorithm
1. Base case: If the array is empty, return `null`.
2. Find the middle index of the current array segment.
3. Create a new tree node with the middle element as its value.
4. Recursively build the left subtree using the left half of the array (elements before the middle).
5. Recursively build the right subtree using the right half of the array (elements after the middle).
6. Return the root node.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def sortedArrayToBST(self, nums: List[int]) -> Optional[TreeNode]:
        if not nums:
            return None

        mid = len(nums) // 2
        root = TreeNode(nums[mid])
        root.left = self.sortedArrayToBST(nums[:mid])
        root.right = self.sortedArrayToBST(nums[mid + 1:])
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
public class Solution {
    public TreeNode sortedArrayToBST(int[] nums) {
        if (nums.length == 0) {
            return null;
        }

        int mid = nums.length / 2;
        TreeNode root = new TreeNode(nums[mid]);
        root.left = sortedArrayToBST(Arrays.copyOfRange(nums, 0, mid));
        root.right = sortedArrayToBST(Arrays.copyOfRange(nums, mid + 1, nums.length));
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
class Solution {
public:
    TreeNode* sortedArrayToBST(vector<int>& nums) {
        if (nums.empty()) {
            return nullptr;
        }

        int mid = nums.size() / 2;
        TreeNode* root = new TreeNode(nums[mid]);
        vector<int> left(nums.begin(), nums.begin() + mid);
        vector<int> right(nums.begin() + mid + 1, nums.end());
        root->left = sortedArrayToBST(left);
        root->right = sortedArrayToBST(right);
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
class Solution {
    /**
     * @param {number[]} nums
     * @return {TreeNode}
     */
    sortedArrayToBST(nums) {
        if (nums.length === 0) {
            return null;
        }

        const mid = Math.floor(nums.length / 2);
        const root = new TreeNode(nums[mid]);
        root.left = this.sortedArrayToBST(nums.slice(0, mid));
        root.right = this.sortedArrayToBST(nums.slice(mid + 1));
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
public class Solution {
    public TreeNode SortedArrayToBST(int[] nums) {
        if (nums.Length == 0) {
            return null;
        }

        int mid = nums.Length / 2;
        TreeNode root = new TreeNode(nums[mid]);
        root.left = SortedArrayToBST(nums.Take(mid).ToArray());
        root.right = SortedArrayToBST(nums.Skip(mid + 1).ToArray());
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
func sortedArrayToBST(nums []int) *TreeNode {
    if len(nums) == 0 {
        return nil
    }

    mid := len(nums) / 2
    root := &TreeNode{Val: nums[mid]}
    root.Left = sortedArrayToBST(nums[:mid])
    root.Right = sortedArrayToBST(nums[mid+1:])
    return root
}
```

```kotlin
/**
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int = 0) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun sortedArrayToBST(nums: IntArray): TreeNode? {
        if (nums.isEmpty()) {
            return null
        }

        val mid = nums.size / 2
        val root = TreeNode(nums[mid])
        root.left = sortedArrayToBST(nums.sliceArray(0 until mid))
        root.right = sortedArrayToBST(nums.sliceArray(mid + 1 until nums.size))
        return root
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
    func sortedArrayToBST(_ nums: [Int]) -> TreeNode? {
        if nums.isEmpty {
            return nil
        }

        let mid = nums.count / 2
        let root = TreeNode(nums[mid])
        root.left = sortedArrayToBST(Array(nums[0..<mid]))
        root.right = sortedArrayToBST(Array(nums[(mid + 1)...]))
        return root
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 2. Depth First Search (Optimal)

### Intuition
The previous approach creates new array copies for each recursive call, which is inefficient. Instead, we can pass indices (left and right boundaries) to indicate the current segment of the array. This avoids array slicing and reduces both time and space overhead while maintaining the same logic of choosing the middle element as root.

### Algorithm
1. Define a helper function that takes `left` and `right` boundary indices.
2. Base case: If `left > right`, return `null` (empty segment).
3. Calculate the middle index as `(left + right) / 2`.
4. Create a tree node with the value at the middle index.
5. Recursively build the left subtree with boundaries `(left, mid - 1)`.
6. Recursively build the right subtree with boundaries `(mid + 1, right)`.
7. Call the helper with initial boundaries `(0, n - 1)` and return the result.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def sortedArrayToBST(self, nums: List[int]) -> TreeNode:
        def helper(l, r):
            if l > r:
                return None
            m = (l + r) // 2
            root = TreeNode(nums[m])
            root.left = helper(l, m - 1)
            root.right = helper(m + 1, r)
            return root

        return helper(0, len(nums) - 1)
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
    public TreeNode sortedArrayToBST(int[] nums) {
        return helper(nums, 0, nums.length - 1);
    }

    private TreeNode helper(int[] nums, int l, int r) {
        if (l > r) {
            return null;
        }
        int m = (l + r) / 2;
        TreeNode root = new TreeNode(nums[m]);
        root.left = helper(nums, l, m - 1);
        root.right = helper(nums, m + 1, r);
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
class Solution {
public:
    TreeNode* sortedArrayToBST(vector<int>& nums) {
        return helper(nums, 0, nums.size() - 1);
    }

private:
    TreeNode* helper(vector<int>& nums, int l, int r) {
        if (l > r) {
            return nullptr;
        }
        int m = (l + r) / 2;
        TreeNode* root = new TreeNode(nums[m]);
        root->left = helper(nums, l, m - 1);
        root->right = helper(nums, m + 1, r);
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
class Solution {
    /**
     * @param {number[]} nums
     * @return {TreeNode}
     */
    sortedArrayToBST(nums) {
        const helper = (l, r) => {
            if (l > r) {
                return null;
            }
            const m = Math.floor((l + r) / 2);
            const root = new TreeNode(nums[m]);
            root.left = helper(l, m - 1);
            root.right = helper(m + 1, r);
            return root;
        };

        return helper(0, nums.length - 1);
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
    public TreeNode SortedArrayToBST(int[] nums) {
        return Helper(nums, 0, nums.Length - 1);
    }

    private TreeNode Helper(int[] nums, int l, int r) {
        if (l > r) {
            return null;
        }
        int m = (l + r) / 2;
        TreeNode root = new TreeNode(nums[m]);
        root.left = Helper(nums, l, m - 1);
        root.right = Helper(nums, m + 1, r);
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
func sortedArrayToBST(nums []int) *TreeNode {
    var helper func(l, r int) *TreeNode
    helper = func(l, r int) *TreeNode {
        if l > r {
            return nil
        }
        m := (l + r) / 2
        root := &TreeNode{Val: nums[m]}
        root.Left = helper(l, m-1)
        root.Right = helper(m+1, r)
        return root
    }

    return helper(0, len(nums)-1)
}
```

```kotlin
/**
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int = 0) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun sortedArrayToBST(nums: IntArray): TreeNode? {
        fun helper(l: Int, r: Int): TreeNode? {
            if (l > r) {
                return null
            }
            val m = (l + r) / 2
            val root = TreeNode(nums[m])
            root.left = helper(l, m - 1)
            root.right = helper(m + 1, r)
            return root
        }

        return helper(0, nums.size - 1)
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
    func sortedArrayToBST(_ nums: [Int]) -> TreeNode? {
        func helper(_ l: Int, _ r: Int) -> TreeNode? {
            if l > r {
                return nil
            }
            let m = (l + r) / 2
            let root = TreeNode(nums[m])
            root.left = helper(l, m - 1)
            root.right = helper(m + 1, r)
            return root
        }

        return helper(0, nums.count - 1)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(\log n)$ space for recursion stack.
    - $O(n)$ space for the output.

---

## 3. Iterative DFS

### Intuition
The recursive approach can be converted to an iterative one using an explicit stack. We store pending work items on the stack, where each item contains a node to be filled and the array bounds it should use. This simulates the recursive call stack and processes each subtree systematically without recursion.

### Algorithm
1. If the array is empty, return `null`.
2. Create a root node with a placeholder value.
3. Push the root node along with its bounds `(0, n-1)` onto a stack.
4. While the stack is not empty:
   - Pop an item containing the node and its bounds `(l, r)`.
   - Calculate the middle index and set the node's value to `nums[mid]`.
   - If there are elements to the left (`l <= mid - 1`), create a left child and push it with bounds `(l, mid - 1)`.
   - If there are elements to the right (`mid + 1 <= r`), create a right child and push it with bounds `(mid + 1, r)`.
5. Return the root.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def sortedArrayToBST(self, nums: List[int]) -> TreeNode:
        if not nums:
            return None

        root = TreeNode(0)
        stack = [(root, 0, len(nums) - 1)]

        while stack:
            node, l, r = stack.pop()
            m = (l + r) // 2
            node.val = nums[m]
            if l <= m - 1:
                node.left = TreeNode(0)
                stack.append((node.left, l, m - 1))
            if m + 1 <= r:
                node.right = TreeNode(0)
                stack.append((node.right, m + 1, r))

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
public class Solution {
    public TreeNode sortedArrayToBST(int[] nums) {
        if (nums.length == 0) {
            return null;
        }

        TreeNode root = new TreeNode(0);
        Stack<int[]> stack = new Stack<>();
        Stack<TreeNode> nodes = new Stack<>();
        stack.push(new int[]{0, nums.length - 1});
        nodes.push(root);

        while (!stack.isEmpty()) {
            int[] range = stack.pop();
            TreeNode node = nodes.pop();
            int l = range[0], r = range[1];
            int m = (l + r) / 2;
            node.val = nums[m];

            if (l <= m - 1) {
                node.left = new TreeNode(0);
                stack.push(new int[]{l, m - 1});
                nodes.push(node.left);
            }
            if (m + 1 <= r) {
                node.right = new TreeNode(0);
                stack.push(new int[]{m + 1, r});
                nodes.push(node.right);
            }
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
class Solution {
public:
    TreeNode* sortedArrayToBST(vector<int>& nums) {
        if (nums.empty()) return nullptr;

        TreeNode* root = new TreeNode(0);
        stack<tuple<TreeNode*, int, int>> stack;
        stack.push({root, 0, (int)nums.size() - 1});

        while (!stack.empty()) {
            auto [node, l, r] = stack.top();
            stack.pop();
            int m = (l + r) / 2;
            node->val = nums[m];

            if (l <= m - 1) {
                node->left = new TreeNode(0);
                stack.push({node->left, l, m - 1});
            }
            if (m + 1 <= r) {
                node->right = new TreeNode(0);
                stack.push({node->right, m + 1, r});
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
class Solution {
    /**
     * @param {number[]} nums
     * @return {TreeNode}
     */
    sortedArrayToBST(nums) {
        if (nums.length === 0) {
            return null;
        }

        const root = new TreeNode(0);
        const stack = [[root, 0, nums.length - 1]];

        while (stack.length) {
            const [node, l, r] = stack.pop();
            const m = Math.floor((l + r) / 2);
            node.val = nums[m];

            if (l <= m - 1) {
                node.left = new TreeNode(0);
                stack.push([node.left, l, m - 1]);
            }
            if (m + 1 <= r) {
                node.right = new TreeNode(0);
                stack.push([node.right, m + 1, r]);
            }
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
public class Solution {
    public TreeNode SortedArrayToBST(int[] nums) {
        if (nums.Length == 0) {
            return null;
        }

        TreeNode root = new TreeNode(0);
        Stack<(TreeNode, int, int)> stack = new Stack<(TreeNode, int, int)>();
        stack.Push((root, 0, nums.Length - 1));

        while (stack.Count > 0) {
            var (node, l, r) = stack.Pop();
            int m = (l + r) / 2;
            node.val = nums[m];

            if (l <= m - 1) {
                node.left = new TreeNode(0);
                stack.Push((node.left, l, m - 1));
            }
            if (m + 1 <= r) {
                node.right = new TreeNode(0);
                stack.Push((node.right, m + 1, r));
            }
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
func sortedArrayToBST(nums []int) *TreeNode {
    if len(nums) == 0 {
        return nil
    }

    type item struct {
        node *TreeNode
        l, r int
    }

    root := &TreeNode{Val: 0}
    stack := []item{{root, 0, len(nums) - 1}}

    for len(stack) > 0 {
        curr := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        m := (curr.l + curr.r) / 2
        curr.node.Val = nums[m]

        if curr.l <= m-1 {
            curr.node.Left = &TreeNode{Val: 0}
            stack = append(stack, item{curr.node.Left, curr.l, m - 1})
        }
        if m+1 <= curr.r {
            curr.node.Right = &TreeNode{Val: 0}
            stack = append(stack, item{curr.node.Right, m + 1, curr.r})
        }
    }

    return root
}
```

```kotlin
/**
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int = 0) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun sortedArrayToBST(nums: IntArray): TreeNode? {
        if (nums.isEmpty()) {
            return null
        }

        val root = TreeNode(0)
        val stack = ArrayDeque<Triple<TreeNode, Int, Int>>()
        stack.addLast(Triple(root, 0, nums.size - 1))

        while (stack.isNotEmpty()) {
            val (node, l, r) = stack.removeLast()
            val m = (l + r) / 2
            node.`val` = nums[m]

            if (l <= m - 1) {
                node.left = TreeNode(0)
                stack.addLast(Triple(node.left!!, l, m - 1))
            }
            if (m + 1 <= r) {
                node.right = TreeNode(0)
                stack.addLast(Triple(node.right!!, m + 1, r))
            }
        }

        return root
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
    func sortedArrayToBST(_ nums: [Int]) -> TreeNode? {
        if nums.isEmpty {
            return nil
        }

        let root = TreeNode(0)
        var stack: [(TreeNode, Int, Int)] = [(root, 0, nums.count - 1)]

        while !stack.isEmpty {
            let (node, l, r) = stack.removeLast()
            let m = (l + r) / 2
            node.val = nums[m]

            if l <= m - 1 {
                node.left = TreeNode(0)
                stack.append((node.left!, l, m - 1))
            }
            if m + 1 <= r {
                node.right = TreeNode(0)
                stack.append((node.right!, m + 1, r))
            }
        }

        return root
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(\log n)$ space for the stack.
    - $O(n)$ space for the output.

---

## Common Pitfalls

### Off-by-One Errors in Subarray Bounds
When recursively building subtrees, a common mistake is including the middle element in one of the subarrays, leading to infinite recursion or duplicate nodes.

```python
# Wrong - includes mid in left subtree
root.left = helper(l, m)  # should be m - 1

# Correct
root.left = helper(l, m - 1)
root.right = helper(m + 1, r)
```

### Choosing Wrong Middle Element in Even-Length Arrays
For arrays with even length, the middle can be either `(l + r) // 2` or `(l + r + 1) // 2`. While both produce valid height-balanced BSTs, inconsistency can cause confusion. The problem accepts either choice, but stick with one consistently.
