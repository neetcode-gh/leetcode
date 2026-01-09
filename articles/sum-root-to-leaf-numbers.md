## 1. Depth First Search

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def sumNumbers(self, root: TreeNode) -> int:
        def dfs(cur, num):
            if not cur:
                return 0

            num = num * 10 + cur.val
            if not cur.left and not cur.right:
                return num
            return dfs(cur.left, num) + dfs(cur.right, num)

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
    public int sumNumbers(TreeNode root) {
        return dfs(root, 0);
    }

    private int dfs(TreeNode cur, int num) {
        if (cur == null) return 0;

        num = num * 10 + cur.val;
        if (cur.left == null && cur.right == null) return num;

        return dfs(cur.left, num) + dfs(cur.right, num);
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
    int sumNumbers(TreeNode* root) {
        return dfs(root, 0);
    }

private:
    int dfs(TreeNode* cur, int num) {
        if (!cur) return 0;

        num = num * 10 + cur->val;
        if (!cur->left && !cur->right) return num;

        return dfs(cur->left, num) + dfs(cur->right, num);
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
    sumNumbers(root) {
        const dfs = (cur, num) => {
            if (!cur) return 0;

            num = num * 10 + cur.val;
            if (!cur.left && !cur.right) return num;

            return dfs(cur.left, num) + dfs(cur.right, num);
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
    public int SumNumbers(TreeNode root) {
        return Dfs(root, 0);
    }

    private int Dfs(TreeNode cur, int num) {
        if (cur == null) return 0;

        num = num * 10 + cur.val;
        if (cur.left == null && cur.right == null) return num;

        return Dfs(cur.left, num) + Dfs(cur.right, num);
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
func sumNumbers(root *TreeNode) int {
    var dfs func(cur *TreeNode, num int) int
    dfs = func(cur *TreeNode, num int) int {
        if cur == nil {
            return 0
        }

        num = num*10 + cur.Val
        if cur.Left == nil && cur.Right == nil {
            return num
        }

        return dfs(cur.Left, num) + dfs(cur.Right, num)
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
    fun sumNumbers(root: TreeNode?): Int {
        return dfs(root, 0)
    }

    private fun dfs(cur: TreeNode?, num: Int): Int {
        if (cur == null) return 0

        val newNum = num * 10 + cur.`val`
        if (cur.left == null && cur.right == null) return newNum

        return dfs(cur.left, newNum) + dfs(cur.right, newNum)
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
    func sumNumbers(_ root: TreeNode?) -> Int {
        func dfs(_ cur: TreeNode?, _ num: Int) -> Int {
            guard let cur = cur else { return 0 }

            let newNum = num * 10 + cur.val
            if cur.left == nil && cur.right == nil {
                return newNum
            }

            return dfs(cur.left, newNum) + dfs(cur.right, newNum)
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

## 2. Breadth First Search

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def sumNumbers(self, root: TreeNode) -> int:
        res = 0
        q = deque([(root, 0)])
        while q:
            cur, num = q.popleft()
            num = num * 10 + cur.val
            if not cur.left and not cur.right:
                res += num
                continue

            if cur.left:
                q.append((cur.left, num))
            if cur.right:
                q.append((cur.right, num))

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
    public int sumNumbers(TreeNode root) {
        int res = 0;
        Queue<Pair<TreeNode, Integer>> q = new LinkedList<>();
        q.offer(new Pair<>(root, 0));
        while (!q.isEmpty()) {
            Pair<TreeNode, Integer> p = q.poll();
            TreeNode cur = p.getKey();
            int num = p.getValue() * 10 + cur.val;
            if (cur.left == null && cur.right == null) {
                res += num;
                continue;
            }

            if (cur.left != null) q.offer(new Pair<>(cur.left, num));
            if (cur.right != null) q.offer(new Pair<>(cur.right, num));
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
    int sumNumbers(TreeNode* root) {
        int res = 0;
        queue<pair<TreeNode*, int>> q;
        q.push({root, 0});
        while (!q.empty()) {
            auto [cur, num] = q.front();q.pop();
            num = num * 10 + cur->val;
            if (!cur->left && !cur->right) {
                res += num;
                continue;
            }

            if (cur->left) q.push({cur->left, num});
            if (cur->right) q.push({cur->right, num});
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
    sumNumbers(root) {
        let res = 0;
        const q = new Queue([[root, 0]]);
        while (!q.isEmpty()) {
            const [cur, num] = q.pop();
            const newNum = num * 10 + cur.val;
            if (!cur.left && !cur.right) {
                res += newNum;
                continue;
            }

            if (cur.left) q.push([cur.left, newNum]);
            if (cur.right) q.push([cur.right, newNum]);
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
    public int SumNumbers(TreeNode root) {
        int res = 0;
        Queue<(TreeNode, int)> q = new Queue<(TreeNode, int)>();
        q.Enqueue((root, 0));
        while (q.Count > 0) {
            var (cur, num) = q.Dequeue();
            int newNum = num * 10 + cur.val;
            if (cur.left == null && cur.right == null) {
                res += newNum;
                continue;
            }

            if (cur.left != null) q.Enqueue((cur.left, newNum));
            if (cur.right != null) q.Enqueue((cur.right, newNum));
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
func sumNumbers(root *TreeNode) int {
    res := 0
    type pair struct {
        node *TreeNode
        num  int
    }
    q := []pair{{root, 0}}
    for len(q) > 0 {
        cur := q[0]
        q = q[1:]
        newNum := cur.num*10 + cur.node.Val
        if cur.node.Left == nil && cur.node.Right == nil {
            res += newNum
            continue
        }

        if cur.node.Left != nil {
            q = append(q, pair{cur.node.Left, newNum})
        }
        if cur.node.Right != nil {
            q = append(q, pair{cur.node.Right, newNum})
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
    fun sumNumbers(root: TreeNode?): Int {
        if (root == null) return 0
        var res = 0
        val q: ArrayDeque<Pair<TreeNode, Int>> = ArrayDeque()
        q.add(Pair(root, 0))
        while (q.isNotEmpty()) {
            val (cur, num) = q.removeFirst()
            val newNum = num * 10 + cur.`val`
            if (cur.left == null && cur.right == null) {
                res += newNum
                continue
            }

            cur.left?.let { q.add(Pair(it, newNum)) }
            cur.right?.let { q.add(Pair(it, newNum)) }
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
    func sumNumbers(_ root: TreeNode?) -> Int {
        guard let root = root else { return 0 }
        var res = 0
        var q: [(TreeNode, Int)] = [(root, 0)]
        while !q.isEmpty {
            let (cur, num) = q.removeFirst()
            let newNum = num * 10 + cur.val
            if cur.left == nil && cur.right == nil {
                res += newNum
                continue
            }

            if let left = cur.left { q.append((left, newNum)) }
            if let right = cur.right { q.append((right, newNum)) }
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

## 3. Iterative DFS

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def sumNumbers(self, root: Optional[TreeNode]) -> int:
        res = 0
        stack = []
        cur, num = root, 0

        while cur or stack:
            if cur:
                num = num * 10 + cur.val
                if not cur.left and not cur.right:
                    res += num

                stack.append((cur.right, num))
                cur = cur.left
            else:
                cur, num = stack.pop()

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
    public int sumNumbers(TreeNode root) {
        int res = 0, num = 0;
        Stack<Pair<TreeNode, Integer>> stack = new Stack<>();
        TreeNode cur = root;

        while (cur != null || !stack.isEmpty()) {
            if (cur != null) {
                num = num * 10 + cur.val;
                if (cur.left == null && cur.right == null)
                    res += num;

                stack.push(new Pair<>(cur.right, num));
                cur = cur.left;
            } else {
                Pair<TreeNode, Integer> p = stack.pop();
                cur = p.getKey();
                num = p.getValue();
            }
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
    int sumNumbers(TreeNode* root) {
        int res = 0;
        stack<pair<TreeNode*, int>> st;
        TreeNode* cur = root;
        int num = 0;

        while (cur || !st.empty()) {
            if (cur) {
                num = num * 10 + cur->val;
                if (!cur->left && !cur->right)
                    res += num;

                st.push({cur->right, num});
                cur = cur->left;
            } else {
                cur = st.top().first;
                num = st.top().second;
                st.pop();
            }
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
    sumNumbers(root) {
        let res = 0,
            num = 0;
        let stack = [];
        let cur = root;

        while (cur || stack.length) {
            if (cur) {
                num = num * 10 + cur.val;
                if (!cur.left && !cur.right) res += num;

                stack.push([cur.right, num]);
                cur = cur.left;
            } else {
                [cur, num] = stack.pop();
            }
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
    public int SumNumbers(TreeNode root) {
        int res = 0, num = 0;
        Stack<(TreeNode, int)> stack = new Stack<(TreeNode, int)>();
        TreeNode cur = root;

        while (cur != null || stack.Count > 0) {
            if (cur != null) {
                num = num * 10 + cur.val;
                if (cur.left == null && cur.right == null)
                    res += num;

                stack.Push((cur.right, num));
                cur = cur.left;
            } else {
                (cur, num) = stack.Pop();
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
func sumNumbers(root *TreeNode) int {
    res, num := 0, 0
    type item struct {
        node *TreeNode
        num  int
    }
    stack := []item{}
    cur := root

    for cur != nil || len(stack) > 0 {
        if cur != nil {
            num = num*10 + cur.Val
            if cur.Left == nil && cur.Right == nil {
                res += num
            }

            stack = append(stack, item{cur.Right, num})
            cur = cur.Left
        } else {
            top := stack[len(stack)-1]
            stack = stack[:len(stack)-1]
            cur, num = top.node, top.num
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
    fun sumNumbers(root: TreeNode?): Int {
        var res = 0
        var num = 0
        val stack = ArrayDeque<Pair<TreeNode?, Int>>()
        var cur = root

        while (cur != null || stack.isNotEmpty()) {
            if (cur != null) {
                num = num * 10 + cur.`val`
                if (cur.left == null && cur.right == null)
                    res += num

                stack.addLast(Pair(cur.right, num))
                cur = cur.left
            } else {
                val (node, n) = stack.removeLast()
                cur = node
                num = n
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
    func sumNumbers(_ root: TreeNode?) -> Int {
        var res = 0, num = 0
        var stack: [(TreeNode?, Int)] = []
        var cur = root

        while cur != nil || !stack.isEmpty {
            if let node = cur {
                num = num * 10 + node.val
                if node.left == nil && node.right == nil {
                    res += num
                }

                stack.append((node.right, num))
                cur = node.left
            } else {
                let (node, n) = stack.removeLast()
                cur = node
                num = n
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(h)$

> Where $n$ is the number of nodes and $h$ is the height of the given tree.

---

## 4. Morris Travrsal

::tabs-start

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def sumNumbers(self, root: Optional[TreeNode]) -> int:
        res = 0
        cur = root
        num = 0
        power = [1] * 10
        for i in range(1, 10):
            power[i] *= power[i - 1] * 10

        while cur:
            if not cur.left:
                num = num * 10 + cur.val
                if not cur.right:
                    res += num
                cur = cur.right
            else:
                prev = cur.left
                steps = 1
                while prev.right and prev.right != cur:
                    prev = prev.right
                    steps += 1

                if not prev.right:
                    prev.right = cur
                    num = num * 10 + cur.val
                    cur = cur.left
                else:
                    prev.right = None
                    if not prev.left:
                        res += num
                    num //= power[steps]
                    cur = cur.right

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
    public int sumNumbers(TreeNode root) {
        int res = 0, num = 0;
        int[] power = new int[10];
        power[0] = 1;
        for (int i = 1; i < 10; i++) {
            power[i] = power[i - 1] * 10;
        }

        TreeNode cur = root;
        while (cur != null) {
            if (cur.left == null) {
                num = num * 10 + cur.val;
                if (cur.right == null) res += num;
                cur = cur.right;
            } else {
                TreeNode prev = cur.left;
                int steps = 1;
                while (prev.right != null && prev.right != cur) {
                    prev = prev.right;
                    steps++;
                }

                if (prev.right == null) {
                    prev.right = cur;
                    num = num * 10 + cur.val;
                    cur = cur.left;
                } else {
                    prev.right = null;
                    if (prev.left == null) res += num;
                    num /= power[steps];
                    cur = cur.right;
                }
            }
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
    int sumNumbers(TreeNode* root) {
        int res = 0, num = 0;
        int power[10] = {1};
        for (int i = 1; i < 10; i++) {
            power[i] = power[i - 1] * 10;
        }

        TreeNode* cur = root;
        while (cur) {
            if (!cur->left) {
                num = num * 10 + cur->val;
                if (!cur->right) res += num;
                cur = cur->right;
            } else {
                TreeNode* prev = cur->left;
                int steps = 1;
                while (prev->right && prev->right != cur) {
                    prev = prev->right;
                    steps++;
                }

                if (!prev->right) {
                    prev->right = cur;
                    num = num * 10 + cur->val;
                    cur = cur->left;
                } else {
                    prev->right = nullptr;
                    if (!prev->left) res += num;
                    num /= power[steps];
                    cur = cur->right;
                }
            }
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
    sumNumbers(root) {
        let res = 0,
            num = 0;
        let power = Array(10).fill(1);
        for (let i = 1; i < 10; i++) {
            power[i] = power[i - 1] * 10;
        }

        let cur = root;
        while (cur) {
            if (!cur.left) {
                num = num * 10 + cur.val;
                if (!cur.right) res += num;
                cur = cur.right;
            } else {
                let prev = cur.left,
                    steps = 1;
                while (prev.right && prev.right !== cur) {
                    prev = prev.right;
                    steps++;
                }

                if (!prev.right) {
                    prev.right = cur;
                    num = num * 10 + cur.val;
                    cur = cur.left;
                } else {
                    prev.right = null;
                    if (!prev.left) res += num;
                    num = Math.floor(num / power[steps]);
                    cur = cur.right;
                }
            }
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
    public int SumNumbers(TreeNode root) {
        int res = 0, num = 0;
        int[] power = new int[10];
        power[0] = 1;
        for (int i = 1; i < 10; i++) {
            power[i] = power[i - 1] * 10;
        }

        TreeNode cur = root;
        while (cur != null) {
            if (cur.left == null) {
                num = num * 10 + cur.val;
                if (cur.right == null) res += num;
                cur = cur.right;
            } else {
                TreeNode prev = cur.left;
                int steps = 1;
                while (prev.right != null && prev.right != cur) {
                    prev = prev.right;
                    steps++;
                }

                if (prev.right == null) {
                    prev.right = cur;
                    num = num * 10 + cur.val;
                    cur = cur.left;
                } else {
                    prev.right = null;
                    if (prev.left == null) res += num;
                    num /= power[steps];
                    cur = cur.right;
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
func sumNumbers(root *TreeNode) int {
    res, num := 0, 0
    power := make([]int, 10)
    power[0] = 1
    for i := 1; i < 10; i++ {
        power[i] = power[i-1] * 10
    }

    cur := root
    for cur != nil {
        if cur.Left == nil {
            num = num*10 + cur.Val
            if cur.Right == nil {
                res += num
            }
            cur = cur.Right
        } else {
            prev := cur.Left
            steps := 1
            for prev.Right != nil && prev.Right != cur {
                prev = prev.Right
                steps++
            }

            if prev.Right == nil {
                prev.Right = cur
                num = num*10 + cur.Val
                cur = cur.Left
            } else {
                prev.Right = nil
                if prev.Left == nil {
                    res += num
                }
                num /= power[steps]
                cur = cur.Right
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
    fun sumNumbers(root: TreeNode?): Int {
        var res = 0
        var num = 0
        val power = IntArray(10)
        power[0] = 1
        for (i in 1 until 10) {
            power[i] = power[i - 1] * 10
        }

        var cur = root
        while (cur != null) {
            if (cur.left == null) {
                num = num * 10 + cur.`val`
                if (cur.right == null) res += num
                cur = cur.right
            } else {
                var prev = cur.left
                var steps = 1
                while (prev!!.right != null && prev.right != cur) {
                    prev = prev.right
                    steps++
                }

                if (prev.right == null) {
                    prev.right = cur
                    num = num * 10 + cur.`val`
                    cur = cur.left
                } else {
                    prev.right = null
                    if (prev.left == null) res += num
                    num /= power[steps]
                    cur = cur.right
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
    func sumNumbers(_ root: TreeNode?) -> Int {
        var res = 0, num = 0
        var power = [Int](repeating: 1, count: 10)
        for i in 1..<10 {
            power[i] = power[i - 1] * 10
        }

        var cur = root
        while cur != nil {
            if cur!.left == nil {
                num = num * 10 + cur!.val
                if cur!.right == nil { res += num }
                cur = cur!.right
            } else {
                var prev = cur!.left
                var steps = 1
                while prev!.right != nil && prev!.right !== cur {
                    prev = prev!.right
                    steps += 1
                }

                if prev!.right == nil {
                    prev!.right = cur
                    num = num * 10 + cur!.val
                    cur = cur!.left
                } else {
                    prev!.right = nil
                    if prev!.left == nil { res += num }
                    num /= power[steps]
                    cur = cur!.right
                }
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
