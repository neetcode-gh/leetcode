## 1. Depth First Search

### Intuition

A path can form a palindrome if at most one digit has an odd count (that digit would go in the middle). As we traverse from root to leaf, we track the count of each digit and maintain a running count of how many digits have odd frequency. At each leaf, we check if the odd count is at most `1`.

### Algorithm

1. Initialize a frequency map for digits (1-9) and an `odd` counter.
2. Define `dfs(node)`:
   - If `null`, return `0`.
   - Increment the count for `node.val`. Update `odd` accordingly (increment if count became odd, decrement if it became even).
   - If it is a leaf node, return `1` if `odd <= 1`, else `0`.
   - Otherwise, recurse on both children and sum results.
   - Before returning, undo the changes (decrement count, restore `odd`).
3. Return `dfs(root)`.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def pseudoPalindromicPaths(self, root: Optional[TreeNode]) -> int:
        count = defaultdict(int)
        odd = 0

        def dfs(cur):
            nonlocal odd
            if not cur:
                return 0

            count[cur.val] += 1
            odd_change = 1 if count[cur.val] % 2 == 1 else -1
            odd += odd_change

            if not cur.left and not cur.right:
                res = 1 if odd <= 1 else 0
            else:
                res = dfs(cur.left) + dfs(cur.right)

            odd -= odd_change
            count[cur.val] -= 1
            return res

        return dfs(root)
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
    public int pseudoPalindromicPaths(TreeNode root) {
        Map<Integer, Integer> count = new HashMap<>();
        int[] odd = new int[1];

        return dfs(root, count, odd);
    }

    private int dfs(TreeNode cur, Map<Integer, Integer> count, int[] odd) {
        if (cur == null) return 0;

        count.put(cur.val, count.getOrDefault(cur.val, 0) + 1);
        int odd_change = (count.get(cur.val) % 2 == 1) ? 1 : -1;
        odd[0] += odd_change;

        int res;
        if (cur.left == null && cur.right == null) {
            res = (odd[0] <= 1) ? 1 : 0;
        } else {
            res = dfs(cur.left, count, odd) + dfs(cur.right, count, odd);
        }

        odd[0] -= odd_change;
        count.put(cur.val, count.get(cur.val) - 1);
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
    int pseudoPalindromicPaths(TreeNode* root) {
        unordered_map<int, int> count;
        int odd = 0;
        return dfs(root, count, odd);
    }

private:
    int dfs(TreeNode* cur, unordered_map<int, int>& count, int& odd) {
        if (!cur) return 0;

        count[cur->val]++;
        int odd_change = (count[cur->val] % 2 == 1) ? 1 : -1;
        odd += odd_change;

        int res;
        if (!cur->left && !cur->right) {
            res = (odd <= 1) ? 1 : 0;
        } else {
            res = dfs(cur->left, count, odd) + dfs(cur->right, count, odd);
        }

        odd -= odd_change;
        count[cur->val]--;
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
     * @return {number}
     */
    pseudoPalindromicPaths(root) {
        const count = new Map();
        let odd = 0;

        const dfs = (cur) => {
            if (!cur) return 0;

            count.set(cur.val, (count.get(cur.val) || 0) + 1);
            let odd_change = count.get(cur.val) % 2 === 1 ? 1 : -1;
            odd += odd_change;

            let res;
            if (!cur.left && !cur.right) {
                res = odd <= 1 ? 1 : 0;
            } else {
                res = dfs(cur.left) + dfs(cur.right);
            }

            odd -= odd_change;
            count.set(cur.val, count.get(cur.val) - 1);
            return res;
        };

        return dfs(root);
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
    public int PseudoPalindromicPaths(TreeNode root) {
        Dictionary<int, int> count = new Dictionary<int, int>();
        int odd = 0;
        return Dfs(root, count, ref odd);
    }

    private int Dfs(TreeNode cur, Dictionary<int, int> count, ref int odd) {
        if (cur == null) return 0;

        if (!count.ContainsKey(cur.val)) count[cur.val] = 0;
        count[cur.val]++;
        int oddChange = (count[cur.val] % 2 == 1) ? 1 : -1;
        odd += oddChange;

        int res;
        if (cur.left == null && cur.right == null) {
            res = (odd <= 1) ? 1 : 0;
        } else {
            res = Dfs(cur.left, count, ref odd) + Dfs(cur.right, count, ref odd);
        }

        odd -= oddChange;
        count[cur.val]--;
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
func pseudoPalindromicPaths(root *TreeNode) int {
    count := make(map[int]int)
    odd := 0

    var dfs func(cur *TreeNode) int
    dfs = func(cur *TreeNode) int {
        if cur == nil {
            return 0
        }

        count[cur.Val]++
        oddChange := 1
        if count[cur.Val]%2 == 0 {
            oddChange = -1
        }
        odd += oddChange

        var res int
        if cur.Left == nil && cur.Right == nil {
            if odd <= 1 {
                res = 1
            } else {
                res = 0
            }
        } else {
            res = dfs(cur.Left) + dfs(cur.Right)
        }

        odd -= oddChange
        count[cur.Val]--
        return res
    }

    return dfs(root)
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
    fun pseudoPalindromicPaths(root: TreeNode?): Int {
        val count = mutableMapOf<Int, Int>()
        var odd = 0

        fun dfs(cur: TreeNode?): Int {
            if (cur == null) return 0

            count[cur.`val`] = (count[cur.`val`] ?: 0) + 1
            val oddChange = if (count[cur.`val`]!! % 2 == 1) 1 else -1
            odd += oddChange

            val res = if (cur.left == null && cur.right == null) {
                if (odd <= 1) 1 else 0
            } else {
                dfs(cur.left) + dfs(cur.right)
            }

            odd -= oddChange
            count[cur.`val`] = count[cur.`val`]!! - 1
            return res
        }

        return dfs(root)
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
    func pseudoPalindromicPaths(_ root: TreeNode?) -> Int {
        var count = [Int: Int]()
        var odd = 0

        func dfs(_ cur: TreeNode?) -> Int {
            guard let cur = cur else { return 0 }

            count[cur.val, default: 0] += 1
            let oddChange = (count[cur.val]! % 2 == 1) ? 1 : -1
            odd += oddChange

            let res: Int
            if cur.left == nil && cur.right == nil {
                res = odd <= 1 ? 1 : 0
            } else {
                res = dfs(cur.left) + dfs(cur.right)
            }

            odd -= oddChange
            count[cur.val]! -= 1
            return res
        }

        return dfs(root)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(h)$ for recursion stack.

> Where $n$ is the number of nodes and $h$ is the height of the given tree.

---

## 2. Depth First Search (Using Array)

### Intuition

Instead of a hash map, we use a fixed-size array since node values are limited to 1-9. We track odd/even counts using XOR: toggling a bit each time a digit appears. This gives a cleaner way to track parity while maintaining the same core logic of counting odd-frequency digits.

### Algorithm

1. Create an array `count[10]` initialized to 0, and an `odd` counter.
2. Define `dfs(node, odd)`:
   - If null, return 0.
   - Toggle `count[node.val]` using XOR. Update `odd` based on whether the count is now odd or even.
   - If it is a leaf and `odd <= 1`, return 1. Otherwise recurse on children.
   - Restore `odd` and toggle `count[node.val]` back before returning.
3. Return `dfs(root, 0)`.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def pseudoPalindromicPaths(self, root: Optional[TreeNode]) -> int:
        count = [0] * 10
        odd = 0

        def dfs(cur):
            nonlocal odd
            if not cur:
                return 0

            count[cur.val] ^= 1
            odd += 1 if count[cur.val] else -1

            if not cur.left and not cur.right and odd <= 1:
                res = 1
            else:
                res = dfs(cur.left) + dfs(cur.right)

            odd -= 1 if count[cur.val] else -1
            count[cur.val] ^= 1

            return res

        return dfs(root)
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
    public int pseudoPalindromicPaths(TreeNode root) {
        int[] count = new int[10];
        return dfs(root, count, 0);
    }

    private int dfs(TreeNode cur, int[] count, int odd) {
        if (cur == null) return 0;

        count[cur.val] ^= 1;
        odd += count[cur.val] == 1 ? 1 : -1;

        int res = (cur.left == null && cur.right == null && odd <= 1) ? 1
                  : dfs(cur.left, count, odd) + dfs(cur.right, count, odd);

        odd += count[cur.val] == 1 ? 1 : -1;
        count[cur.val] ^= 1;

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
    int pseudoPalindromicPaths(TreeNode* root) {
        int count[10] = {};
        return dfs(root, count, 0);
    }

private:
    int dfs(TreeNode* cur, int count[], int odd) {
        if (!cur) return 0;

        count[cur->val] ^= 1;
        odd += (count[cur->val] == 1) ? 1 : -1;

        int res = (!cur->left && !cur->right && odd <= 1) ? 1
                  : dfs(cur->left, count, odd) + dfs(cur->right, count, odd);

        odd += (count[cur->val] == 1) ? 1 : -1;
        count[cur->val] ^= 1;

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
     * @return {number}
     */
    pseudoPalindromicPaths(root) {
        const count = new Array(10).fill(0);

        const dfs = (cur, odd) => {
            if (!cur) return 0;

            count[cur.val] ^= 1;
            odd += count[cur.val] === 1 ? 1 : -1;

            let res =
                !cur.left && !cur.right && odd <= 1
                    ? 1
                    : dfs(cur.left, odd) + dfs(cur.right, odd);

            odd += count[cur.val] === 1 ? 1 : -1;
            count[cur.val] ^= 1;

            return res;
        };

        return dfs(root, 0);
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
    public int PseudoPalindromicPaths(TreeNode root) {
        int[] count = new int[10];
        return Dfs(root, count, 0);
    }

    private int Dfs(TreeNode cur, int[] count, int odd) {
        if (cur == null) return 0;

        count[cur.val] ^= 1;
        odd += count[cur.val] == 1 ? 1 : -1;

        int res = (cur.left == null && cur.right == null && odd <= 1) ? 1
                  : Dfs(cur.left, count, odd) + Dfs(cur.right, count, odd);

        odd += count[cur.val] == 1 ? 1 : -1;
        count[cur.val] ^= 1;

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
func pseudoPalindromicPaths(root *TreeNode) int {
    count := make([]int, 10)

    var dfs func(cur *TreeNode, odd int) int
    dfs = func(cur *TreeNode, odd int) int {
        if cur == nil {
            return 0
        }

        count[cur.Val] ^= 1
        if count[cur.Val] == 1 {
            odd++
        } else {
            odd--
        }

        var res int
        if cur.Left == nil && cur.Right == nil && odd <= 1 {
            res = 1
        } else {
            res = dfs(cur.Left, odd) + dfs(cur.Right, odd)
        }

        if count[cur.Val] == 1 {
            odd++
        } else {
            odd--
        }
        count[cur.Val] ^= 1

        return res
    }

    return dfs(root, 0)
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
    fun pseudoPalindromicPaths(root: TreeNode?): Int {
        val count = IntArray(10)

        fun dfs(cur: TreeNode?, odd: Int): Int {
            if (cur == null) return 0

            count[cur.`val`] = count[cur.`val`] xor 1
            var newOdd = odd + if (count[cur.`val`] == 1) 1 else -1

            val res = if (cur.left == null && cur.right == null && newOdd <= 1) {
                1
            } else {
                dfs(cur.left, newOdd) + dfs(cur.right, newOdd)
            }

            newOdd += if (count[cur.`val`] == 1) 1 else -1
            count[cur.`val`] = count[cur.`val`] xor 1

            return res
        }

        return dfs(root, 0)
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
    func pseudoPalindromicPaths(_ root: TreeNode?) -> Int {
        var count = [Int](repeating: 0, count: 10)

        func dfs(_ cur: TreeNode?, _ odd: Int) -> Int {
            guard let cur = cur else { return 0 }

            count[cur.val] ^= 1
            var newOdd = odd + (count[cur.val] == 1 ? 1 : -1)

            let res: Int
            if cur.left == nil && cur.right == nil && newOdd <= 1 {
                res = 1
            } else {
                res = dfs(cur.left, newOdd) + dfs(cur.right, newOdd)
            }

            newOdd += (count[cur.val] == 1 ? 1 : -1)
            count[cur.val] ^= 1

            return res
        }

        return dfs(root, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(h)$ for recursion stack.

> Where $n$ is the number of nodes and $h$ is the height of the given tree.

---

## 3. Depth First Search (Bit Mask)

### Intuition

We can encode all parity information in a single integer using bits. Each bit position represents a digit, and the bit is 1 if that digit has appeared an odd number of times. XOR toggles the bit on each occurrence. At a leaf, if the path is pseudo-palindromic, at most one bit should be set. We check this with the trick: `path & (path - 1) == 0` (true for 0 or exactly one bit set).

### Algorithm

1. Define `dfs(node, path)`:
   - If null, return 0.
   - Toggle the bit for `node.val`: `path ^= (1 << node.val)`.
   - If it is a leaf, return 1 if `(path & (path - 1)) == 0`, else 0.
   - Otherwise, return `dfs(left, path) + dfs(right, path)`.
2. Call `dfs(root, 0)`.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def pseudoPalindromicPaths(self, root: Optional[TreeNode]) -> int:
        def dfs(node, path):
            if not node:
                return 0

            path ^= 1 << node.val
            if not node.left and not node.right:
                return 1 if (path & (path - 1)) == 0 else 0

            return dfs(node.left, path) + dfs(node.right, path)

        return dfs(root, 0)
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
    public int pseudoPalindromicPaths(TreeNode root) {
        return dfs(root, 0);
    }

    private int dfs(TreeNode node, int path) {
        if (node == null) return 0;

        path ^= (1 << node.val);
        if (node.left == null && node.right == null) {
            return (path & (path - 1)) == 0 ? 1 : 0;
        }

        return dfs(node.left, path) + dfs(node.right, path);
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
    int pseudoPalindromicPaths(TreeNode* root) {
        return dfs(root, 0);
    }

private:
    int dfs(TreeNode* node, int path) {
        if (!node) return 0;

        path ^= (1 << node->val);
        if (!node->left && !node->right) {
            return (path & (path - 1)) == 0 ? 1 : 0;
        }

        return dfs(node->left, path) + dfs(node->right, path);
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
     * @return {number}
     */
    pseudoPalindromicPaths(root) {
        const dfs = (node, path) => {
            if (!node) return 0;

            path ^= 1 << node.val;
            if (!node.left && !node.right) {
                return (path & (path - 1)) === 0 ? 1 : 0;
            }

            return dfs(node.left, path) + dfs(node.right, path);
        };

        return dfs(root, 0);
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
    public int PseudoPalindromicPaths(TreeNode root) {
        return Dfs(root, 0);
    }

    private int Dfs(TreeNode node, int path) {
        if (node == null) return 0;

        path ^= (1 << node.val);
        if (node.left == null && node.right == null) {
            return (path & (path - 1)) == 0 ? 1 : 0;
        }

        return Dfs(node.left, path) + Dfs(node.right, path);
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
func pseudoPalindromicPaths(root *TreeNode) int {
    var dfs func(node *TreeNode, path int) int
    dfs = func(node *TreeNode, path int) int {
        if node == nil {
            return 0
        }

        path ^= (1 << node.Val)
        if node.Left == nil && node.Right == nil {
            if path&(path-1) == 0 {
                return 1
            }
            return 0
        }

        return dfs(node.Left, path) + dfs(node.Right, path)
    }

    return dfs(root, 0)
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
    fun pseudoPalindromicPaths(root: TreeNode?): Int {
        fun dfs(node: TreeNode?, path: Int): Int {
            if (node == null) return 0

            val newPath = path xor (1 shl node.`val`)
            if (node.left == null && node.right == null) {
                return if (newPath and (newPath - 1) == 0) 1 else 0
            }

            return dfs(node.left, newPath) + dfs(node.right, newPath)
        }

        return dfs(root, 0)
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
    func pseudoPalindromicPaths(_ root: TreeNode?) -> Int {
        func dfs(_ node: TreeNode?, _ path: Int) -> Int {
            guard let node = node else { return 0 }

            let newPath = path ^ (1 << node.val)
            if node.left == nil && node.right == nil {
                return (newPath & (newPath - 1)) == 0 ? 1 : 0
            }

            return dfs(node.left, newPath) + dfs(node.right, newPath)
        }

        return dfs(root, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(h)$ for recursion stack.

> Where $n$ is the number of nodes and $h$ is the height of the given tree.

---

## 4. Breadth First Search

### Intuition

BFS traverses level by level using a queue. We pair each node with its current path bitmask. When we reach a leaf, we check if the path can form a palindrome using the same bit trick. This approach uses more space than DFS but processes nodes in breadth-first order.

### Algorithm

1. Initialize a queue with `(root, 0)`.
2. While the queue is not empty:
   - Dequeue `(node, path)`.
   - Update `path ^= (1 << node.val)`.
   - If it is a leaf, increment the count if `(path & (path - 1)) == 0`.
   - Otherwise, enqueue children with the updated path.
3. Return the count.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def pseudoPalindromicPaths(self, root: Optional[TreeNode]) -> int:
        res = 0
        q = deque([(root, 0)])
        while q:
            node, path = q.popleft()
            path ^= 1 << node.val

            if not node.left and not node.right:
                if path & (path - 1) == 0:
                    res += 1
                continue

            if node.left:
                q.append((node.left, path))
            if node.right:
                q.append((node.right, path))

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
    public int pseudoPalindromicPaths(TreeNode root) {
        int count = 0;
        Queue<Pair> q = new LinkedList<>();
        q.offer(new Pair(root, 0));
        while (!q.isEmpty()) {
            Pair p = q.poll();
            TreeNode node = p.node;
            int path = p.path ^ (1 << node.val);

            if (node.left == null && node.right == null) {
                if ((path & (path - 1)) == 0) {
                    count++;
                }
            } else {
                if (node.left != null) q.offer(new Pair(node.left, path));
                if (node.right != null) q.offer(new Pair(node.right, path));
            }
        }

        return count;
    }

    private static class Pair {
        TreeNode node;
        int path;
        Pair(TreeNode node, int path) {
            this.node = node;
            this.path = path;
        }
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
    int pseudoPalindromicPaths(TreeNode* root) {
        int res = 0;
        queue<pair<TreeNode*, int>> q;
        q.push({root, 0});
        while (!q.empty()) {
            auto [node, path] = q.front();q.pop();
            path ^= (1 << node->val);

            if (!node->left && !node->right) {
                if ((path & (path - 1)) == 0) res++;
                continue;
            }

            if (node->left) q.push({node->left, path});
            if (node->right) q.push({node->right, path});
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
     * @return {number}
     */
    pseudoPalindromicPaths(root) {
        let res = 0;
        const q = new Queue([[root, 0]]);

        while (!q.isEmpty()) {
            const [node, path] = q.pop();
            const newPath = path ^ (1 << node.val);

            if (!node.left && !node.right) {
                if ((newPath & (newPath - 1)) === 0) res++;
                continue;
            }

            if (node.left) q.push([node.left, newPath]);
            if (node.right) q.push([node.right, newPath]);
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
    public int PseudoPalindromicPaths(TreeNode root) {
        int res = 0;
        Queue<(TreeNode node, int path)> q = new Queue<(TreeNode, int)>();
        q.Enqueue((root, 0));

        while (q.Count > 0) {
            var (node, path) = q.Dequeue();
            int newPath = path ^ (1 << node.val);

            if (node.left == null && node.right == null) {
                if ((newPath & (newPath - 1)) == 0) res++;
                continue;
            }

            if (node.left != null) q.Enqueue((node.left, newPath));
            if (node.right != null) q.Enqueue((node.right, newPath));
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
func pseudoPalindromicPaths(root *TreeNode) int {
    res := 0
    type pair struct {
        node *TreeNode
        path int
    }
    queue := []pair{{root, 0}}

    for len(queue) > 0 {
        p := queue[0]
        queue = queue[1:]
        node, path := p.node, p.path
        newPath := path ^ (1 << node.Val)

        if node.Left == nil && node.Right == nil {
            if newPath&(newPath-1) == 0 {
                res++
            }
            continue
        }

        if node.Left != nil {
            queue = append(queue, pair{node.Left, newPath})
        }
        if node.Right != nil {
            queue = append(queue, pair{node.Right, newPath})
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
    fun pseudoPalindromicPaths(root: TreeNode?): Int {
        if (root == null) return 0

        var res = 0
        val queue = ArrayDeque<Pair<TreeNode, Int>>()
        queue.add(Pair(root, 0))

        while (queue.isNotEmpty()) {
            val (node, path) = queue.removeFirst()
            val newPath = path xor (1 shl node.`val`)

            if (node.left == null && node.right == null) {
                if (newPath and (newPath - 1) == 0) res++
                continue
            }

            node.left?.let { queue.add(Pair(it, newPath)) }
            node.right?.let { queue.add(Pair(it, newPath)) }
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
    func pseudoPalindromicPaths(_ root: TreeNode?) -> Int {
        guard let root = root else { return 0 }

        var res = 0
        var queue: [(TreeNode, Int)] = [(root, 0)]

        while !queue.isEmpty {
            let (node, path) = queue.removeFirst()
            let newPath = path ^ (1 << node.val)

            if node.left == nil && node.right == nil {
                if newPath & (newPath - 1) == 0 {
                    res += 1
                }
                continue
            }

            if let left = node.left {
                queue.append((left, newPath))
            }
            if let right = node.right {
                queue.append((right, newPath))
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 5. Iterative DFS

### Intuition

We can simulate recursive DFS using an explicit stack. Each stack entry contains a node and the path bitmask accumulated so far. This avoids recursion overhead and potential stack overflow for very deep trees, while maintaining the same DFS traversal order.

### Algorithm

1. Initialize a stack with `(root, 0)`.
2. While the stack is not empty:
   - Pop `(node, path)`.
   - Update `path ^= (1 << node.val)`.
   - If it is a leaf, increment the count if `(path & (path - 1)) == 0`.
   - Otherwise, push children (with updated path) onto the stack.
3. Return the count.

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def pseudoPalindromicPaths(self, root: Optional[TreeNode]) -> int:
        count = 0
        stack = [(root, 0)]
        while stack:
            node, path = stack.pop()
            path ^= (1 << node.val)

            if not node.left and not node.right:
                if path & (path - 1) == 0:
                    count += 1
            else:
                if node.right:
                    stack.append((node.right, path))
                if node.left:
                    stack.append((node.left, path))

        return count
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
    public int pseudoPalindromicPaths(TreeNode root) {
        int count = 0;
        Stack<Pair> stack = new Stack<>();
        stack.push(new Pair(root, 0));

        while (!stack.isEmpty()) {
            Pair p = stack.pop();
            TreeNode node = p.node;
            int path = p.path ^ (1 << node.val);

            if (node.left == null && node.right == null) {
                if ((path & (path - 1)) == 0) {
                    count++;
                }
            } else {
                if (node.right != null) stack.push(new Pair(node.right, path));
                if (node.left != null) stack.push(new Pair(node.left, path));
            }
        }
        return count;
    }

    private static class Pair {
        TreeNode node;
        int path;
        Pair(TreeNode node, int path) {
            this.node = node;
            this.path = path;
        }
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
    int pseudoPalindromicPaths(TreeNode* root) {
        stack<pair<TreeNode*, int>> s;
        s.push({root, 0});
        int count = 0;

        while (!s.empty()) {
            auto [node, path] = s.top();
            s.pop();
            path ^= (1 << node->val);

            if (!node->left && !node->right) {
                if ((path & (path - 1)) == 0) count++;
            } else {
                if (node->right) s.push({node->right, path});
                if (node->left) s.push({node->left, path});
            }
        }

        return count;
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
     * @return {number}
     */
    pseudoPalindromicPaths(root) {
        let count = 0;
        const stack = [[root, 0]];

        while (stack.length) {
            const [node, path] = stack.pop();
            const newPath = path ^ (1 << node.val);

            if (!node.left && !node.right) {
                if ((newPath & (newPath - 1)) === 0) count++;
            } else {
                if (node.right) stack.push([node.right, newPath]);
                if (node.left) stack.push([node.left, newPath]);
            }
        }

        return count;
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
    public int PseudoPalindromicPaths(TreeNode root) {
        int count = 0;
        Stack<(TreeNode node, int path)> stack = new Stack<(TreeNode, int)>();
        stack.Push((root, 0));

        while (stack.Count > 0) {
            var (node, path) = stack.Pop();
            int newPath = path ^ (1 << node.val);

            if (node.left == null && node.right == null) {
                if ((newPath & (newPath - 1)) == 0) count++;
            } else {
                if (node.right != null) stack.Push((node.right, newPath));
                if (node.left != null) stack.Push((node.left, newPath));
            }
        }

        return count;
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
func pseudoPalindromicPaths(root *TreeNode) int {
    count := 0
    type pair struct {
        node *TreeNode
        path int
    }
    stack := []pair{{root, 0}}

    for len(stack) > 0 {
        p := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        node, path := p.node, p.path
        newPath := path ^ (1 << node.Val)

        if node.Left == nil && node.Right == nil {
            if newPath&(newPath-1) == 0 {
                count++
            }
        } else {
            if node.Right != nil {
                stack = append(stack, pair{node.Right, newPath})
            }
            if node.Left != nil {
                stack = append(stack, pair{node.Left, newPath})
            }
        }
    }

    return count
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
    fun pseudoPalindromicPaths(root: TreeNode?): Int {
        if (root == null) return 0

        var count = 0
        val stack = ArrayDeque<Pair<TreeNode, Int>>()
        stack.addLast(Pair(root, 0))

        while (stack.isNotEmpty()) {
            val (node, path) = stack.removeLast()
            val newPath = path xor (1 shl node.`val`)

            if (node.left == null && node.right == null) {
                if (newPath and (newPath - 1) == 0) count++
            } else {
                node.right?.let { stack.addLast(Pair(it, newPath)) }
                node.left?.let { stack.addLast(Pair(it, newPath)) }
            }
        }

        return count
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
    func pseudoPalindromicPaths(_ root: TreeNode?) -> Int {
        guard let root = root else { return 0 }

        var count = 0
        var stack: [(TreeNode, Int)] = [(root, 0)]

        while !stack.isEmpty {
            let (node, path) = stack.removeLast()
            let newPath = path ^ (1 << node.val)

            if node.left == nil && node.right == nil {
                if newPath & (newPath - 1) == 0 {
                    count += 1
                }
            } else {
                if let right = node.right {
                    stack.append((right, newPath))
                }
                if let left = node.left {
                    stack.append((left, newPath))
                }
            }
        }

        return count
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(h)$

> Where $n$ is the number of nodes and $h$ is the height of the given tree.

---

## Common Pitfalls

### Forgetting to Backtrack State

When using DFS with a shared count array or bitmask, failing to restore the state after returning from recursive calls corrupts the path information for sibling subtrees. Always undo the toggle operation (XOR back or decrement count) before returning from the current node.

### Checking Palindrome Condition at Non-Leaf Nodes

The pseudo-palindrome check should only occur at leaf nodes (where both left and right children are null). Checking at internal nodes leads to counting incomplete paths and produces incorrect results. Always verify `node.left == null && node.right == null` before evaluating the palindrome condition.

### Misunderstanding the Palindrome Condition

A path can form a palindrome if at most one digit has an odd count (the middle element for odd-length palindromes). Using `odd == 0` instead of `odd <= 1` misses valid paths with odd length. The bitmask check `path & (path - 1) == 0` correctly identifies zero or one bit set.
