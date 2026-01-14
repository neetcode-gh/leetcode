## 1. Recursion

### Intuition
A quad tree recursively divides a 2D grid into four quadrants. If all values in a region are the same, that region becomes a leaf node. Otherwise, we split it into four equal parts and recursively build the tree. For each region, we first check if all cells have the same value; if so, we create a leaf node.

### Algorithm
1. Define `dfs(n, r, c)` where `n` is the size of the current region and `(r, c)` is its top-left corner.
2. Check if all cells in the `n x n` region starting at `(r, c)` have the same value.
3. If all values are the same, return a leaf node with that value.
4. Otherwise, divide `n` by 2 and recursively build four children:
   - topLeft: `dfs(n/2, r, c)`
   - topRight: `dfs(n/2, r, c + n/2)`
   - bottomLeft: `dfs(n/2, r + n/2, c)`
   - bottomRight: `dfs(n/2, r + n/2, c + n/2)`
5. Return a non-leaf node with these four children.

::tabs-start

```python
"""
# Definition for a QuadTree node.
class Node:
    def __init__(self, val, isLeaf, topLeft, topRight, bottomLeft, bottomRight):
        self.val = val
        self.isLeaf = isLeaf
        self.topLeft = topLeft
        self.topRight = topRight
        self.bottomLeft = bottomLeft
        self.bottomRight = bottomRight
"""

class Solution:
    def construct(self, grid: List[List[int]]) -> 'Node':
        def dfs(n, r, c):
            allSame = True
            for i in range(n):
                for j in range(n):
                    if grid[r][c] != grid[r + i][c + j]:
                        allSame = False
                        break
            if allSame:
                return Node(grid[r][c], True)

            n = n // 2
            topleft = dfs(n, r, c)
            topright = dfs(n, r, c + n)
            bottomleft = dfs(n, r + n, c)
            bottomright = dfs(n, r + n, c + n)

            return Node(0, False, topleft, topright, bottomleft, bottomright)

        return dfs(len(grid), 0, 0)
```

```java
/*
// Definition for a QuadTree node.
class Node {
    public boolean val;
    public boolean isLeaf;
    public Node topLeft;
    public Node topRight;
    public Node bottomLeft;
    public Node bottomRight;


    public Node() {
        this.val = false;
        this.isLeaf = false;
        this.topLeft = null;
        this.topRight = null;
        this.bottomLeft = null;
        this.bottomRight = null;
    }

    public Node(boolean val, boolean isLeaf) {
        this.val = val;
        this.isLeaf = isLeaf;
        this.topLeft = null;
        this.topRight = null;
        this.bottomLeft = null;
        this.bottomRight = null;
    }

    public Node(boolean val, boolean isLeaf, Node topLeft, Node topRight, Node bottomLeft, Node bottomRight) {
        this.val = val;
        this.isLeaf = isLeaf;
        this.topLeft = topLeft;
        this.topRight = topRight;
        this.bottomLeft = bottomLeft;
        this.bottomRight = bottomRight;
    }
}
*/

public class Solution {
    public Node construct(int[][] grid) {
        return dfs(grid, grid.length, 0, 0);
    }

    private Node dfs(int[][] grid, int n, int r, int c) {
        boolean allSame = true;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[r][c] != grid[r + i][c + j]) {
                    allSame = false;
                    break;
                }
            }
        }

        if (allSame) {
            return new Node(grid[r][c] == 1, true);
        }

        int mid = n / 2;
        Node topLeft = dfs(grid, mid, r, c);
        Node topRight = dfs(grid, mid, r, c + mid);
        Node bottomLeft = dfs(grid, mid, r + mid, c);
        Node bottomRight = dfs(grid, mid, r + mid, c + mid);

        return new Node(false, false, topLeft, topRight, bottomLeft, bottomRight);
    }
}
```

```cpp
/*
// Definition for a QuadTree node.
class Node {
public:
    bool val;
    bool isLeaf;
    Node* topLeft;
    Node* topRight;
    Node* bottomLeft;
    Node* bottomRight;

    Node() {
        val = false;
        isLeaf = false;
        topLeft = NULL;
        topRight = NULL;
        bottomLeft = NULL;
        bottomRight = NULL;
    }

    Node(bool _val, bool _isLeaf) {
        val = _val;
        isLeaf = _isLeaf;
        topLeft = NULL;
        topRight = NULL;
        bottomLeft = NULL;
        bottomRight = NULL;
    }

    Node(bool _val, bool _isLeaf, Node* _topLeft, Node* _topRight, Node* _bottomLeft, Node* _bottomRight) {
        val = _val;
        isLeaf = _isLeaf;
        topLeft = _topLeft;
        topRight = _topRight;
        bottomLeft = _bottomLeft;
        bottomRight = _bottomRight;
    }
};
*/

class Solution {
public:
    Node* construct(vector<vector<int>>& grid) {
        return dfs(grid, grid.size(), 0, 0);
    }

private:
    Node* dfs(vector<vector<int>>& grid, int n, int r, int c) {
        bool allSame = true;

        for (int i = 0; i < n && allSame; ++i) {
            for (int j = 0; j < n; ++j) {
                if (grid[r][c] != grid[r + i][c + j]) {
                    allSame = false;
                    break;
                }
            }
        }

        if (allSame) {
            return new Node(grid[r][c] == 1, true);
        }

        int mid = n / 2;
        Node* topLeft = dfs(grid, mid, r, c);
        Node* topRight = dfs(grid, mid, r, c + mid);
        Node* bottomLeft = dfs(grid, mid, r + mid, c);
        Node* bottomRight = dfs(grid, mid, r + mid, c + mid);

        return new Node(false, false, topLeft, topRight, bottomLeft, bottomRight);
    }
};
```

```javascript
/**
 * // Definition for a QuadTree node.
 * class Node {
 *     constructor(val,isLeaf,topLeft,topRight,bottomLeft,bottomRight) {
 *         this.val = val;
 *         this.isLeaf = isLeaf;
 *         this.topLeft = topLeft;
 *         this.topRight = topRight;
 *         this.bottomLeft = bottomLeft;
 *         this.bottomRight = bottomRight;
 *     }
 * }
 */

class Solution {
    /**
     * @param {number[][]} grid
     * @return {Node}
     */
    construct(grid) {
        const dfs = (n, r, c) => {
            let allSame = true;

            for (let i = 0; i < n && allSame; i++) {
                for (let j = 0; j < n; j++) {
                    if (grid[r][c] !== grid[r + i][c + j]) {
                        allSame = false;
                        break;
                    }
                }
            }

            if (allSame) {
                return new Node(grid[r][c] === 1, true);
            }

            const mid = Math.floor(n / 2);
            const topLeft = dfs(mid, r, c);
            const topRight = dfs(mid, r, c + mid);
            const bottomLeft = dfs(mid, r + mid, c);
            const bottomRight = dfs(mid, r + mid, c + mid);

            return new Node(
                false,
                false,
                topLeft,
                topRight,
                bottomLeft,
                bottomRight,
            );
        };

        return dfs(grid.length, 0, 0);
    }
}
```

```csharp
/*
// Definition for a QuadTree node.
public class Node {
    public bool val;
    public bool isLeaf;
    public Node topLeft;
    public Node topRight;
    public Node bottomLeft;
    public Node bottomRight;

    public Node() {
        val = false;
        isLeaf = false;
        topLeft = null;
        topRight = null;
        bottomLeft = null;
        bottomRight = null;
    }

    public Node(bool _val, bool _isLeaf) {
        val = _val;
        isLeaf = _isLeaf;
        topLeft = null;
        topRight = null;
        bottomLeft = null;
        bottomRight = null;
    }

    public Node(bool _val,bool _isLeaf,Node _topLeft,Node _topRight,Node _bottomLeft,Node _bottomRight) {
        val = _val;
        isLeaf = _isLeaf;
        topLeft = _topLeft;
        topRight = _topRight;
        bottomLeft = _bottomLeft;
        bottomRight = _bottomRight;
    }
}
*/

public class Solution {
    public Node Construct(int[][] grid) {
        return Dfs(grid, grid.Length, 0, 0);
    }

    private Node Dfs(int[][] grid, int n, int r, int c) {
        bool allSame = true;
        for (int i = 0; i < n && allSame; i++) {
            for (int j = 0; j < n && allSame; j++) {
                if (grid[r][c] != grid[r + i][c + j]) {
                    allSame = false;
                }
            }
        }

        if (allSame) {
            return new Node(grid[r][c] == 1, true);
        }

        int half = n / 2;
        Node topLeft = Dfs(grid, half, r, c);
        Node topRight = Dfs(grid, half, r, c + half);
        Node bottomLeft = Dfs(grid, half, r + half, c);
        Node bottomRight = Dfs(grid, half, r + half, c + half);

        return new Node(false, false, topLeft, topRight, bottomLeft, bottomRight);
    }
}
```

```go
/**
 * Definition for a QuadTree node.
 * type Node struct {
 *     Val bool
 *     IsLeaf bool
 *     TopLeft *Node
 *     TopRight *Node
 *     BottomLeft *Node
 *     BottomRight *Node
 * }
 */

func construct(grid [][]int) *Node {
    return dfs(grid, len(grid), 0, 0)
}

func dfs(grid [][]int, n, r, c int) *Node {
    allSame := true
    for i := 0; i < n && allSame; i++ {
        for j := 0; j < n; j++ {
            if grid[r][c] != grid[r+i][c+j] {
                allSame = false
                break
            }
        }
    }

    if allSame {
        return &Node{Val: grid[r][c] == 1, IsLeaf: true}
    }

    mid := n / 2
    topLeft := dfs(grid, mid, r, c)
    topRight := dfs(grid, mid, r, c+mid)
    bottomLeft := dfs(grid, mid, r+mid, c)
    bottomRight := dfs(grid, mid, r+mid, c+mid)

    return &Node{
        Val:         false,
        IsLeaf:      false,
        TopLeft:     topLeft,
        TopRight:    topRight,
        BottomLeft:  bottomLeft,
        BottomRight: bottomRight,
    }
}
```

```kotlin
/**
 * Definition for a QuadTree node.
 * class Node(var `val`: Boolean, var isLeaf: Boolean) {
 *     var topLeft: Node? = null
 *     var topRight: Node? = null
 *     var bottomLeft: Node? = null
 *     var bottomRight: Node? = null
 * }
 */

class Solution {
    fun construct(grid: Array<IntArray>): Node? {
        return dfs(grid, grid.size, 0, 0)
    }

    private fun dfs(grid: Array<IntArray>, n: Int, r: Int, c: Int): Node {
        var allSame = true
        outer@ for (i in 0 until n) {
            for (j in 0 until n) {
                if (grid[r][c] != grid[r + i][c + j]) {
                    allSame = false
                    break@outer
                }
            }
        }

        if (allSame) {
            return Node(grid[r][c] == 1, true)
        }

        val mid = n / 2
        val topLeft = dfs(grid, mid, r, c)
        val topRight = dfs(grid, mid, r, c + mid)
        val bottomLeft = dfs(grid, mid, r + mid, c)
        val bottomRight = dfs(grid, mid, r + mid, c + mid)

        return Node(false, false).apply {
            this.topLeft = topLeft
            this.topRight = topRight
            this.bottomLeft = bottomLeft
            this.bottomRight = bottomRight
        }
    }
}
```

```swift
/**
 * Definition for a QuadTree node.
 * public class Node {
 *     public var val: Bool
 *     public var isLeaf: Bool
 *     public var topLeft: Node?
 *     public var topRight: Node?
 *     public var bottomLeft: Node?
 *     public var bottomRight: Node?
 *     public init(_ val: Bool, _ isLeaf: Bool) {
 *         self.val = val
 *         self.isLeaf = isLeaf
 *         self.topLeft = nil
 *         self.topRight = nil
 *         self.bottomLeft = nil
 *         self.bottomRight = nil
 *     }
 * }
 */

class Solution {
    func construct(_ grid: [[Int]]) -> Node? {
        return dfs(grid, grid.count, 0, 0)
    }

    private func dfs(_ grid: [[Int]], _ n: Int, _ r: Int, _ c: Int) -> Node {
        var allSame = true
        outer: for i in 0..<n {
            for j in 0..<n {
                if grid[r][c] != grid[r + i][c + j] {
                    allSame = false
                    break outer
                }
            }
        }

        if allSame {
            return Node(grid[r][c] == 1, true)
        }

        let mid = n / 2
        let topLeft = dfs(grid, mid, r, c)
        let topRight = dfs(grid, mid, r, c + mid)
        let bottomLeft = dfs(grid, mid, r + mid, c)
        let bottomRight = dfs(grid, mid, r + mid, c + mid)

        let node = Node(false, false)
        node.topLeft = topLeft
        node.topRight = topRight
        node.bottomLeft = bottomLeft
        node.bottomRight = bottomRight
        return node
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 \log n)$
- Space complexity: $O(\log n)$ for recursion stack.

---

## 2. Recursion (Optimal)

### Intuition
Instead of checking uniformity before recursing, we can recurse first and check uniformity after. If we reach a single cell, it is always a leaf. For larger regions, we build all four children first, then check if they are all leaves with the same value. If so, we can merge them into a single leaf node, avoiding the O(n^2) check at each level.

### Algorithm
1. Define `dfs(n, r, c)` where `n` is the region size and `(r, c)` is its top-left corner.
2. Base case: if `n == 1`, return a leaf node with `grid[r][c]`.
3. Recursively build the four quadrants with size `n / 2`.
4. If all four children are leaves and have the same value, return a single leaf with that value (merge them).
5. Otherwise, return a non-leaf node with the four children.

::tabs-start

```python
"""
# Definition for a QuadTree node.
class Node:
    def __init__(self, val, isLeaf, topLeft, topRight, bottomLeft, bottomRight):
        self.val = val
        self.isLeaf = isLeaf
        self.topLeft = topLeft
        self.topRight = topRight
        self.bottomLeft = bottomLeft
        self.bottomRight = bottomRight
"""

class Solution:
    def construct(self, grid: List[List[int]]) -> 'Node':
        def dfs(n, r, c):
            if n == 1:
                return Node(grid[r][c] == 1, True)

            mid = n // 2
            topLeft = dfs(mid, r, c)
            topRight = dfs(mid, r, c + mid)
            bottomLeft = dfs(mid, r + mid, c)
            bottomRight = dfs(mid, r + mid, c + mid)

            if (topLeft.isLeaf and topRight.isLeaf and
                bottomLeft.isLeaf and bottomRight.isLeaf and
                topLeft.val == topRight.val == bottomLeft.val == bottomRight.val):
                return Node(topLeft.val, True)

            return Node(False, False, topLeft, topRight, bottomLeft, bottomRight)

        return dfs(len(grid), 0, 0)
```

```java
/*
// Definition for a QuadTree node.
class Node {
    public boolean val;
    public boolean isLeaf;
    public Node topLeft;
    public Node topRight;
    public Node bottomLeft;
    public Node bottomRight;


    public Node() {
        this.val = false;
        this.isLeaf = false;
        this.topLeft = null;
        this.topRight = null;
        this.bottomLeft = null;
        this.bottomRight = null;
    }

    public Node(boolean val, boolean isLeaf) {
        this.val = val;
        this.isLeaf = isLeaf;
        this.topLeft = null;
        this.topRight = null;
        this.bottomLeft = null;
        this.bottomRight = null;
    }

    public Node(boolean val, boolean isLeaf, Node topLeft, Node topRight, Node bottomLeft, Node bottomRight) {
        this.val = val;
        this.isLeaf = isLeaf;
        this.topLeft = topLeft;
        this.topRight = topRight;
        this.bottomLeft = bottomLeft;
        this.bottomRight = bottomRight;
    }
}
*/

public class Solution {
    public Node construct(int[][] grid) {
        return dfs(grid, grid.length, 0, 0);
    }

    private Node dfs(int[][] grid, int n, int r, int c) {
        if (n == 1) {
            return new Node(grid[r][c] == 1, true);
        }

        int mid = n / 2;
        Node topLeft = dfs(grid, mid, r, c);
        Node topRight = dfs(grid, mid, r, c + mid);
        Node bottomLeft = dfs(grid, mid, r + mid, c);
        Node bottomRight = dfs(grid, mid, r + mid, c + mid);

        if (topLeft.isLeaf && topRight.isLeaf &&
            bottomLeft.isLeaf && bottomRight.isLeaf &&
            topLeft.val == topRight.val &&
            topLeft.val == bottomLeft.val &&
            topLeft.val == bottomRight.val) {
            return new Node(topLeft.val, true);
        }

        return new Node(false, false, topLeft, topRight, bottomLeft, bottomRight);
    }
}
```

```cpp
/*
// Definition for a QuadTree node.
class Node {
public:
    bool val;
    bool isLeaf;
    Node* topLeft;
    Node* topRight;
    Node* bottomLeft;
    Node* bottomRight;

    Node() {
        val = false;
        isLeaf = false;
        topLeft = NULL;
        topRight = NULL;
        bottomLeft = NULL;
        bottomRight = NULL;
    }

    Node(bool _val, bool _isLeaf) {
        val = _val;
        isLeaf = _isLeaf;
        topLeft = NULL;
        topRight = NULL;
        bottomLeft = NULL;
        bottomRight = NULL;
    }

    Node(bool _val, bool _isLeaf, Node* _topLeft, Node* _topRight, Node* _bottomLeft, Node* _bottomRight) {
        val = _val;
        isLeaf = _isLeaf;
        topLeft = _topLeft;
        topRight = _topRight;
        bottomLeft = _bottomLeft;
        bottomRight = _bottomRight;
    }
};
*/

class Solution {
public:
    Node* construct(vector<vector<int>>& grid) {
        return dfs(grid, grid.size(), 0, 0);
    }

private:
    Node* dfs(vector<vector<int>>& grid, int n, int r, int c) {
        if (n == 1) {
            return new Node(grid[r][c] == 1, true);
        }

        int mid = n / 2;
        Node* topLeft = dfs(grid, mid, r, c);
        Node* topRight = dfs(grid, mid, r, c + mid);
        Node* bottomLeft = dfs(grid, mid, r + mid, c);
        Node* bottomRight = dfs(grid, mid, r + mid, c + mid);

        if (topLeft->isLeaf && topRight->isLeaf &&
            bottomLeft->isLeaf && bottomRight->isLeaf &&
            topLeft->val == topRight->val &&
            topLeft->val == bottomLeft->val &&
            topLeft->val == bottomRight->val) {
            return new Node(topLeft->val, true);
        }

        return new Node(false, false, topLeft, topRight, bottomLeft, bottomRight);
    }
};
```

```javascript
/**
 * // Definition for a QuadTree node.
 * class Node {
 *     constructor(val,isLeaf,topLeft,topRight,bottomLeft,bottomRight) {
 *         this.val = val;
 *         this.isLeaf = isLeaf;
 *         this.topLeft = topLeft;
 *         this.topRight = topRight;
 *         this.bottomLeft = bottomLeft;
 *         this.bottomRight = bottomRight;
 *     }
 * }
 */

class Solution {
    /**
     * @param {number[][]} grid
     * @return {Node}
     */
    construct(grid) {
        const dfs = (n, r, c) => {
            if (n === 1) {
                return new Node(grid[r][c] === 1, true);
            }

            const mid = Math.floor(n / 2);
            const topLeft = dfs(mid, r, c);
            const topRight = dfs(mid, r, c + mid);
            const bottomLeft = dfs(mid, r + mid, c);
            const bottomRight = dfs(mid, r + mid, c + mid);

            if (
                topLeft.isLeaf &&
                topRight.isLeaf &&
                bottomLeft.isLeaf &&
                bottomRight.isLeaf &&
                topLeft.val === topRight.val &&
                topLeft.val === bottomLeft.val &&
                topLeft.val === bottomRight.val
            ) {
                return new Node(topLeft.val, true);
            }

            return new Node(
                false,
                false,
                topLeft,
                topRight,
                bottomLeft,
                bottomRight,
            );
        };

        return dfs(grid.length, 0, 0);
    }
}
```

```csharp
/*
// Definition for a QuadTree node.
public class Node {
    public bool val;
    public bool isLeaf;
    public Node topLeft;
    public Node topRight;
    public Node bottomLeft;
    public Node bottomRight;

    public Node() {
        val = false;
        isLeaf = false;
        topLeft = null;
        topRight = null;
        bottomLeft = null;
        bottomRight = null;
    }

    public Node(bool _val, bool _isLeaf) {
        val = _val;
        isLeaf = _isLeaf;
        topLeft = null;
        topRight = null;
        bottomLeft = null;
        bottomRight = null;
    }

    public Node(bool _val,bool _isLeaf,Node _topLeft,Node _topRight,Node _bottomLeft,Node _bottomRight) {
        val = _val;
        isLeaf = _isLeaf;
        topLeft = _topLeft;
        topRight = _topRight;
        bottomLeft = _bottomLeft;
        bottomRight = _bottomRight;
    }
}
*/

public class Solution {
    public Node Construct(int[][] grid) {
        return Dfs(grid, grid.Length, 0, 0);
    }

    private Node Dfs(int[][] grid, int n, int r, int c) {
        if (n == 1) {
            return new Node(grid[r][c] == 1, true);
        }

        int mid = n / 2;
        Node topLeft = Dfs(grid, mid, r, c);
        Node topRight = Dfs(grid, mid, r, c + mid);
        Node bottomLeft = Dfs(grid, mid, r + mid, c);
        Node bottomRight = Dfs(grid, mid, r + mid, c + mid);

        if (topLeft.isLeaf && topRight.isLeaf &&
            bottomLeft.isLeaf && bottomRight.isLeaf &&
            topLeft.val == topRight.val &&
            topRight.val == bottomLeft.val &&
            bottomLeft.val == bottomRight.val) {
            return new Node(topLeft.val, true);
        }

        return new Node(false, false, topLeft, topRight, bottomLeft, bottomRight);
    }
}
```

```go
/**
 * Definition for a QuadTree node.
 * type Node struct {
 *     Val bool
 *     IsLeaf bool
 *     TopLeft *Node
 *     TopRight *Node
 *     BottomLeft *Node
 *     BottomRight *Node
 * }
 */

func construct(grid [][]int) *Node {
    return dfs(grid, len(grid), 0, 0)
}

func dfs(grid [][]int, n, r, c int) *Node {
    if n == 1 {
        return &Node{Val: grid[r][c] == 1, IsLeaf: true}
    }

    mid := n / 2
    topLeft := dfs(grid, mid, r, c)
    topRight := dfs(grid, mid, r, c+mid)
    bottomLeft := dfs(grid, mid, r+mid, c)
    bottomRight := dfs(grid, mid, r+mid, c+mid)

    if topLeft.IsLeaf && topRight.IsLeaf &&
        bottomLeft.IsLeaf && bottomRight.IsLeaf &&
        topLeft.Val == topRight.Val &&
        topLeft.Val == bottomLeft.Val &&
        topLeft.Val == bottomRight.Val {
        return &Node{Val: topLeft.Val, IsLeaf: true}
    }

    return &Node{
        Val:         false,
        IsLeaf:      false,
        TopLeft:     topLeft,
        TopRight:    topRight,
        BottomLeft:  bottomLeft,
        BottomRight: bottomRight,
    }
}
```

```kotlin
/**
 * Definition for a QuadTree node.
 * class Node(var `val`: Boolean, var isLeaf: Boolean) {
 *     var topLeft: Node? = null
 *     var topRight: Node? = null
 *     var bottomLeft: Node? = null
 *     var bottomRight: Node? = null
 * }
 */

class Solution {
    fun construct(grid: Array<IntArray>): Node? {
        return dfs(grid, grid.size, 0, 0)
    }

    private fun dfs(grid: Array<IntArray>, n: Int, r: Int, c: Int): Node {
        if (n == 1) {
            return Node(grid[r][c] == 1, true)
        }

        val mid = n / 2
        val topLeft = dfs(grid, mid, r, c)
        val topRight = dfs(grid, mid, r, c + mid)
        val bottomLeft = dfs(grid, mid, r + mid, c)
        val bottomRight = dfs(grid, mid, r + mid, c + mid)

        if (topLeft.isLeaf && topRight.isLeaf &&
            bottomLeft.isLeaf && bottomRight.isLeaf &&
            topLeft.`val` == topRight.`val` &&
            topLeft.`val` == bottomLeft.`val` &&
            topLeft.`val` == bottomRight.`val`) {
            return Node(topLeft.`val`, true)
        }

        return Node(false, false).apply {
            this.topLeft = topLeft
            this.topRight = topRight
            this.bottomLeft = bottomLeft
            this.bottomRight = bottomRight
        }
    }
}
```

```swift
/**
 * Definition for a QuadTree node.
 * public class Node {
 *     public var val: Bool
 *     public var isLeaf: Bool
 *     public var topLeft: Node?
 *     public var topRight: Node?
 *     public var bottomLeft: Node?
 *     public var bottomRight: Node?
 *     public init(_ val: Bool, _ isLeaf: Bool) {
 *         self.val = val
 *         self.isLeaf = isLeaf
 *         self.topLeft = nil
 *         self.topRight = nil
 *         self.bottomLeft = nil
 *         self.bottomRight = nil
 *     }
 * }
 */

class Solution {
    func construct(_ grid: [[Int]]) -> Node? {
        return dfs(grid, grid.count, 0, 0)
    }

    private func dfs(_ grid: [[Int]], _ n: Int, _ r: Int, _ c: Int) -> Node {
        if n == 1 {
            return Node(grid[r][c] == 1, true)
        }

        let mid = n / 2
        let topLeft = dfs(grid, mid, r, c)
        let topRight = dfs(grid, mid, r, c + mid)
        let bottomLeft = dfs(grid, mid, r + mid, c)
        let bottomRight = dfs(grid, mid, r + mid, c + mid)

        if topLeft.isLeaf && topRight.isLeaf &&
            bottomLeft.isLeaf && bottomRight.isLeaf &&
            topLeft.val == topRight.val &&
            topLeft.val == bottomLeft.val &&
            topLeft.val == bottomRight.val {
            return Node(topLeft.val, true)
        }

        let node = Node(false, false)
        node.topLeft = topLeft
        node.topRight = topRight
        node.bottomLeft = bottomLeft
        node.bottomRight = bottomRight
        return node
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(\log n)$ for recursion stack.

---

## 3. Recursion (Space Optimized)

### Intuition
We can optimize memory by reusing leaf nodes. Since all leaves with value `true` are identical and all leaves with value `false` are identical, we can create just two singleton leaf nodes and reuse them throughout the tree instead of creating new leaf nodes each time.

### Algorithm
1. Create two shared leaf nodes: one for `false` and one for `true`.
2. Define `dfs(n, r, c)` as before.
3. Base case: if `n == 1`, return the appropriate shared leaf node based on `grid[r][c]`.
4. Recursively build the four quadrants.
5. If all four children are leaves with the same value, return one of the children (they point to the same shared node).
6. Otherwise, return a new non-leaf node with the four children.

::tabs-start

```python
"""
# Definition for a QuadTree node.
class Node:
    def __init__(self, val, isLeaf, topLeft, topRight, bottomLeft, bottomRight):
        self.val = val
        self.isLeaf = isLeaf
        self.topLeft = topLeft
        self.topRight = topRight
        self.bottomLeft = bottomLeft
        self.bottomRight = bottomRight
"""

class Solution:
    def construct(self, grid: List[List[int]]) -> 'Node':
        leafNodes = {
            0: Node(False, True),
            1: Node(True, True)
        }

        def dfs(n, r, c):
            if n == 1:
                return leafNodes[grid[r][c]]

            n //= 2
            topLeft = dfs(n, r, c)
            topRight = dfs(n, r, c + n)
            bottomLeft = dfs(n, r + n, c)
            bottomRight = dfs(n, r + n, c + n)

            if (topLeft.isLeaf and topRight.isLeaf and
                bottomLeft.isLeaf and bottomRight.isLeaf and
                topLeft.val == topRight.val == bottomLeft.val == bottomRight.val):
                return topLeft

            return Node(False, False, topLeft, topRight, bottomLeft, bottomRight)

        return dfs(len(grid), 0, 0)
```

```java
/*
// Definition for a QuadTree node.
class Node {
    public boolean val;
    public boolean isLeaf;
    public Node topLeft;
    public Node topRight;
    public Node bottomLeft;
    public Node bottomRight;


    public Node() {
        this.val = false;
        this.isLeaf = false;
        this.topLeft = null;
        this.topRight = null;
        this.bottomLeft = null;
        this.bottomRight = null;
    }

    public Node(boolean val, boolean isLeaf) {
        this.val = val;
        this.isLeaf = isLeaf;
        this.topLeft = null;
        this.topRight = null;
        this.bottomLeft = null;
        this.bottomRight = null;
    }

    public Node(boolean val, boolean isLeaf, Node topLeft, Node topRight, Node bottomLeft, Node bottomRight) {
        this.val = val;
        this.isLeaf = isLeaf;
        this.topLeft = topLeft;
        this.topRight = topRight;
        this.bottomLeft = bottomLeft;
        this.bottomRight = bottomRight;
    }
}
*/

public class Solution {
    private static final Node falseLeaf = new Node(false, true);
    private static final Node trueLeaf = new Node(true, true);

    public Node construct(int[][] grid) {
        return dfs(grid, grid.length, 0, 0);
    }

    private Node dfs(int[][] grid, int n, int r, int c) {
        if (n == 1) {
            return grid[r][c] == 1 ? trueLeaf : falseLeaf;
        }

        n /= 2;
        Node topLeft = dfs(grid, n, r, c);
        Node topRight = dfs(grid, n, r, c + n);
        Node bottomLeft = dfs(grid, n, r + n, c);
        Node bottomRight = dfs(grid, n, r + n, c + n);

        if (topLeft.isLeaf && topRight.isLeaf &&
            bottomLeft.isLeaf && bottomRight.isLeaf &&
            topLeft.val == topRight.val && topLeft.val == bottomLeft.val &&
            topLeft.val == bottomRight.val) {
            return topLeft;
        }

        return new Node(false, false, topLeft, topRight, bottomLeft, bottomRight);
    }
}
```

```cpp
/*
// Definition for a QuadTree node.
class Node {
public:
    bool val;
    bool isLeaf;
    Node* topLeft;
    Node* topRight;
    Node* bottomLeft;
    Node* bottomRight;

    Node() {
        val = false;
        isLeaf = false;
        topLeft = NULL;
        topRight = NULL;
        bottomLeft = NULL;
        bottomRight = NULL;
    }

    Node(bool _val, bool _isLeaf) {
        val = _val;
        isLeaf = _isLeaf;
        topLeft = NULL;
        topRight = NULL;
        bottomLeft = NULL;
        bottomRight = NULL;
    }

    Node(bool _val, bool _isLeaf, Node* _topLeft, Node* _topRight, Node* _bottomLeft, Node* _bottomRight) {
        val = _val;
        isLeaf = _isLeaf;
        topLeft = _topLeft;
        topRight = _topRight;
        bottomLeft = _bottomLeft;
        bottomRight = _bottomRight;
    }
};
*/

class Solution {
private:
    Node* falseLeaf = new Node(false, true);
    Node* trueLeaf = new Node(true, true);

public:
    Node* construct(vector<vector<int>>& grid) {
        return dfs(grid, grid.size(), 0, 0);
    }

private:
    Node* dfs(vector<vector<int>>& grid, int n, int r, int c) {
        if (n == 1) {
            return grid[r][c] == 1 ? trueLeaf : falseLeaf;
        }

        n /= 2;
        Node* topLeft = dfs(grid, n, r, c);
        Node* topRight = dfs(grid, n, r, c + n);
        Node* bottomLeft = dfs(grid, n, r + n, c);
        Node* bottomRight = dfs(grid, n, r + n, c + n);

        if (topLeft->isLeaf && topRight->isLeaf &&
            bottomLeft->isLeaf && bottomRight->isLeaf &&
            topLeft->val == topRight->val && topLeft->val == bottomLeft->val &&
            topLeft->val == bottomRight->val) {
            return topLeft;
        }

        return new Node(false, false, topLeft, topRight, bottomLeft, bottomRight);
    }
};
```

```javascript
/**
 * // Definition for a QuadTree node.
 * class Node {
 *     constructor(val,isLeaf,topLeft,topRight,bottomLeft,bottomRight) {
 *         this.val = val;
 *         this.isLeaf = isLeaf;
 *         this.topLeft = topLeft;
 *         this.topRight = topRight;
 *         this.bottomLeft = bottomLeft;
 *         this.bottomRight = bottomRight;
 *     }
 * }
 */

class Solution {
    /**
     * @param {number[][]} grid
     * @return {Node}
     */
    construct(grid) {
        const falseLeaf = new Node(false, true);
        const trueLeaf = new Node(true, true);

        const dfs = (n, r, c) => {
            if (n === 1) {
                return grid[r][c] === 1 ? trueLeaf : falseLeaf;
            }

            n = Math.floor(n / 2);
            const topLeft = dfs(n, r, c);
            const topRight = dfs(n, r, c + n);
            const bottomLeft = dfs(n, r + n, c);
            const bottomRight = dfs(n, r + n, c + n);

            if (
                topLeft.isLeaf &&
                topRight.isLeaf &&
                bottomLeft.isLeaf &&
                bottomRight.isLeaf &&
                topLeft.val === topRight.val &&
                topLeft.val === bottomLeft.val &&
                topLeft.val === bottomRight.val
            ) {
                return topLeft;
            }

            return new Node(
                false,
                false,
                topLeft,
                topRight,
                bottomLeft,
                bottomRight,
            );
        };

        return dfs(grid.length, 0, 0);
    }
}
```

```csharp
/*
// Definition for a QuadTree node.
public class Node {
    public bool val;
    public bool isLeaf;
    public Node topLeft;
    public Node topRight;
    public Node bottomLeft;
    public Node bottomRight;

    public Node() {
        val = false;
        isLeaf = false;
        topLeft = null;
        topRight = null;
        bottomLeft = null;
        bottomRight = null;
    }

    public Node(bool _val, bool _isLeaf) {
        val = _val;
        isLeaf = _isLeaf;
        topLeft = null;
        topRight = null;
        bottomLeft = null;
        bottomRight = null;
    }

    public Node(bool _val,bool _isLeaf,Node _topLeft,Node _topRight,Node _bottomLeft,Node _bottomRight) {
        val = _val;
        isLeaf = _isLeaf;
        topLeft = _topLeft;
        topRight = _topRight;
        bottomLeft = _bottomLeft;
        bottomRight = _bottomRight;
    }
}
*/

public class Solution {
    private readonly Node falseLeaf = new Node(false, true);
    private readonly Node trueLeaf = new Node(true, true);

    public Node Construct(int[][] grid) {
        int n = grid.Length;
        return Dfs(grid, n, 0, 0);
    }

    private Node Dfs(int[][] grid, int n, int r, int c) {
        if (n == 1) {
            return grid[r][c] == 1 ? trueLeaf : falseLeaf;
        }

        int half = n / 2;
        Node topLeft = Dfs(grid, half, r, c);
        Node topRight = Dfs(grid, half, r, c + half);
        Node bottomLeft = Dfs(grid, half, r + half, c);
        Node bottomRight = Dfs(grid, half, r + half, c + half);

        if (topLeft.isLeaf && topRight.isLeaf &&
            bottomLeft.isLeaf && bottomRight.isLeaf &&
            topLeft.val == topRight.val &&
            topLeft.val == bottomLeft.val &&
            topLeft.val == bottomRight.val) {
            return topLeft;
        }

        return new Node(false, false, topLeft, topRight, bottomLeft, bottomRight);
    }
}
```

```go
/**
 * Definition for a QuadTree node.
 * type Node struct {
 *     Val bool
 *     IsLeaf bool
 *     TopLeft *Node
 *     TopRight *Node
 *     BottomLeft *Node
 *     BottomRight *Node
 * }
 */

var falseLeaf = &Node{Val: false, IsLeaf: true}
var trueLeaf = &Node{Val: true, IsLeaf: true}

func construct(grid [][]int) *Node {
    return dfs(grid, len(grid), 0, 0)
}

func dfs(grid [][]int, n, r, c int) *Node {
    if n == 1 {
        if grid[r][c] == 1 {
            return trueLeaf
        }
        return falseLeaf
    }

    n /= 2
    topLeft := dfs(grid, n, r, c)
    topRight := dfs(grid, n, r, c+n)
    bottomLeft := dfs(grid, n, r+n, c)
    bottomRight := dfs(grid, n, r+n, c+n)

    if topLeft.IsLeaf && topRight.IsLeaf &&
        bottomLeft.IsLeaf && bottomRight.IsLeaf &&
        topLeft.Val == topRight.Val &&
        topLeft.Val == bottomLeft.Val &&
        topLeft.Val == bottomRight.Val {
        return topLeft
    }

    return &Node{
        Val:         false,
        IsLeaf:      false,
        TopLeft:     topLeft,
        TopRight:    topRight,
        BottomLeft:  bottomLeft,
        BottomRight: bottomRight,
    }
}
```

```kotlin
/**
 * Definition for a QuadTree node.
 * class Node(var `val`: Boolean, var isLeaf: Boolean) {
 *     var topLeft: Node? = null
 *     var topRight: Node? = null
 *     var bottomLeft: Node? = null
 *     var bottomRight: Node? = null
 * }
 */

class Solution {
    private val falseLeaf = Node(false, true)
    private val trueLeaf = Node(true, true)

    fun construct(grid: Array<IntArray>): Node? {
        return dfs(grid, grid.size, 0, 0)
    }

    private fun dfs(grid: Array<IntArray>, n: Int, r: Int, c: Int): Node {
        if (n == 1) {
            return if (grid[r][c] == 1) trueLeaf else falseLeaf
        }

        val half = n / 2
        val topLeft = dfs(grid, half, r, c)
        val topRight = dfs(grid, half, r, c + half)
        val bottomLeft = dfs(grid, half, r + half, c)
        val bottomRight = dfs(grid, half, r + half, c + half)

        if (topLeft.isLeaf && topRight.isLeaf &&
            bottomLeft.isLeaf && bottomRight.isLeaf &&
            topLeft.`val` == topRight.`val` &&
            topLeft.`val` == bottomLeft.`val` &&
            topLeft.`val` == bottomRight.`val`) {
            return topLeft
        }

        return Node(false, false).apply {
            this.topLeft = topLeft
            this.topRight = topRight
            this.bottomLeft = bottomLeft
            this.bottomRight = bottomRight
        }
    }
}
```

```swift
/**
 * Definition for a QuadTree node.
 * public class Node {
 *     public var val: Bool
 *     public var isLeaf: Bool
 *     public var topLeft: Node?
 *     public var topRight: Node?
 *     public var bottomLeft: Node?
 *     public var bottomRight: Node?
 *     public init(_ val: Bool, _ isLeaf: Bool) {
 *         self.val = val
 *         self.isLeaf = isLeaf
 *         self.topLeft = nil
 *         self.topRight = nil
 *         self.bottomLeft = nil
 *         self.bottomRight = nil
 *     }
 * }
 */

class Solution {
    private let falseLeaf = Node(false, true)
    private let trueLeaf = Node(true, true)

    func construct(_ grid: [[Int]]) -> Node? {
        return dfs(grid, grid.count, 0, 0)
    }

    private func dfs(_ grid: [[Int]], _ n: Int, _ r: Int, _ c: Int) -> Node {
        if n == 1 {
            return grid[r][c] == 1 ? trueLeaf : falseLeaf
        }

        let half = n / 2
        let topLeft = dfs(grid, half, r, c)
        let topRight = dfs(grid, half, r, c + half)
        let bottomLeft = dfs(grid, half, r + half, c)
        let bottomRight = dfs(grid, half, r + half, c + half)

        if topLeft.isLeaf && topRight.isLeaf &&
            bottomLeft.isLeaf && bottomRight.isLeaf &&
            topLeft.val == topRight.val &&
            topLeft.val == bottomLeft.val &&
            topLeft.val == bottomRight.val {
            return topLeft
        }

        let node = Node(false, false)
        node.topLeft = topLeft
        node.topRight = topRight
        node.bottomLeft = bottomLeft
        node.bottomRight = bottomRight
        return node
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(\log n)$ for recursion stack.

---

## Common Pitfalls

### Confusing Row and Column Offsets When Dividing Quadrants
When dividing the grid into four quadrants, the top-left stays at `(r, c)`, but the other three quadrants need correct offsets. A common mistake is swapping row and column increments.
```python
# Wrong: Incorrect quadrant positions
topRight = dfs(n//2, r + n//2, c)  # Should be (r, c + n//2)
bottomLeft = dfs(n//2, r, c + n//2)  # Should be (r + n//2, c)
```

### Forgetting to Check All Four Children Are Leaves Before Merging
When merging four children into a single leaf node, you must verify that all four children are leaves AND have the same value. Checking only the values without confirming they are leaves will incorrectly merge non-leaf nodes.
```python
# Wrong: Only checking values
if topLeft.val == topRight.val == bottomLeft.val == bottomRight.val:
    return Node(topLeft.val, True)

# Correct: Check isLeaf AND values
if (topLeft.isLeaf and topRight.isLeaf and
    bottomLeft.isLeaf and bottomRight.isLeaf and
    topLeft.val == topRight.val == bottomLeft.val == bottomRight.val):
    return Node(topLeft.val, True)
```

### Using Wrong Grid Size for Recursion
When dividing the grid, the new size should be `n // 2`, not `n - 1` or any other calculation. Each level of recursion should exactly halve the region size since the grid dimension is always a power of 2.
