## 1. Postorder Traversal

### Intuition

To find the subtree with the maximum average, we need to know each subtree's sum and node count. A key observation is that a subtree's values depend entirely on its children's values. This makes postorder traversal the natural choice: we process children first, then use their results to compute the parent's values.

For each node, we track three things: the number of nodes in its subtree, the sum of values in its subtree, and the maximum average found so far. By bubbling these values up from leaves to the root, we can compute the average at every node and keep track of the best one.

### Algorithm

1. Define a helper structure `State` to hold three values: `nodeCount`, `valueSum`, and `maxAverage`.
2. Perform a postorder traversal using recursion:
   - Base case: if the node is null, return a state with all zeros.
   - Recursively process the left and right children.
   - Compute the current node's count as `left.nodeCount + right.nodeCount + 1`.
   - Compute the current node's sum as `left.valueSum + right.valueSum + node.val`.
   - Compute the current subtree's average and compare it with the maximum averages from both children.
3. Return the `maxAverage` from the root's state.

::tabs-start

```python
class Solution:
    # for each node in the tree, we will maintain three values
    class State:
        def __init__(self, nodes, sum_val, max_average):
            # count of nodes in the subtree
            self.node_count = nodes
            # sum of values in the subtree
            self.value_sum = sum_val
            # max average found in the subtree
            self.max_average = max_average
    
    def maximumAverageSubtree(self, root: Optional[TreeNode]) -> float:
        return self.max_average(root).max_average
    
    def max_average(self, root):
        if root is None:
            return self.State(0, 0, 0)
        
        # postorder traversal, solve for both child nodes first.
        left = self.max_average(root.left)
        right = self.max_average(root.right)
        
        # now find nodeCount, valueSum and maxAverage for current node `root`
        node_count = left.node_count + right.node_count + 1
        sum_val = left.value_sum + right.value_sum + root.val
        max_average = max(
            (1.0 * sum_val) / node_count,  # average for current node
            max(right.max_average, left.max_average)  # max average from child nodes
        )
        
        return self.State(node_count, sum_val, max_average)
```

```java
class Solution {
    // for each node in the tree, we will maintain three values
    class State {
        // count of nodes in the subtree
        int nodeCount;

        // sum of values in the subtree
        int valueSum;

        // max average found in the subtree
        double maxAverage;

        State(int nodes, int sum, double maxAverage) {
            this.nodeCount = nodes;
            this.valueSum = sum;
            this.maxAverage = maxAverage;
        }
    }

    public double maximumAverageSubtree(TreeNode root) {
        return maxAverage(root).maxAverage;
    }

    State maxAverage(TreeNode root) {
        if (root == null) {
            return new State(0, 0, 0);
        }

        // postorder traversal, solve for both child nodes first.
        State left = maxAverage(root.left);
        State right = maxAverage(root.right);

        // now find nodeCount, valueSum and maxAverage for current node `root`
        int nodeCount = left.nodeCount + right.nodeCount + 1;
        int sum = left.valueSum + right.valueSum + root.val;
        double maxAverage = Math.max(
                (1.0 * (sum)) / nodeCount, // average for current node
                Math.max(right.maxAverage, left.maxAverage) // max average from child nodes
        );

        return new State(nodeCount, sum, maxAverage);
    }
}
```

```cpp
class Solution {
public:
    double maximumAverageSubtree(TreeNode* root) {
        return maxAverage(root).maxAverage;
    }

private:
    struct State {
        // count of nodes in the subtree
        int nodeCount;

        // sum of values in the subtree
        int valueSum;

        // max average found in the subtree
        double maxAverage;
    };

    State maxAverage(TreeNode* root) {
        if (!root) return {0, 0, 0};

        // postorder traversal, solve for both child nodes first.
        State left = maxAverage(root->left);
        State right = maxAverage(root->right);

        // now find nodeCount, valueSum and maxAverage for current node `root`
        int nodeCount = left.nodeCount + right.nodeCount + 1;
        int sum = left.valueSum + right.valueSum + root->val;
        double maxAverage = max(
                (1.0 * (sum)) / nodeCount, // average for current node
                max(right.maxAverage, left.maxAverage) // max average from child nodes
        );

        return {nodeCount, sum, maxAverage};
    }
};
```

```javascript
// for each node in the tree, we will maintain three values
class State {
    constructor(nodes, sum, maxAverage) {
        // count of nodes in the subtree
        this.nodeCount = nodes;
        // sum of values in the subtree
        this.valueSum = sum;
        // max average found in the subtree
        this.maxAverage = maxAverage;
    }
}

class Solution {
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    maximumAverageSubtree(root) {
        return this.maxAverage(root).maxAverage;
    }

    maxAverage(root) {
        if (root === null) {
            return new State(0, 0, 0);
        }

        // postorder traversal, solve for both child nodes first.
        const left = this.maxAverage(root.left);
        const right = this.maxAverage(root.right);

        // now find nodeCount, valueSum and maxAverage for current node `root`
        const nodeCount = left.nodeCount + right.nodeCount + 1;
        const sum = left.valueSum + right.valueSum + root.val;
        const maxAverage = Math.max(
            (1.0 * sum) / nodeCount,  // average for current node
            Math.max(right.maxAverage, left.maxAverage)  // max average from child nodes
        );

        return new State(nodeCount, sum, maxAverage);
    }
}
```

```csharp
public class Solution {
    // for each node in the tree, we will maintain three values
    class State {
        // count of nodes in the subtree
        public int nodeCount;
        // sum of values in the subtree
        public int valueSum;
        // max average found in the subtree
        public double maxAverage;

        public State(int nodes, int sum, double maxAverage) {
            this.nodeCount = nodes;
            this.valueSum = sum;
            this.maxAverage = maxAverage;
        }
    }

    public double MaximumAverageSubtree(TreeNode root) {
        return MaxAverage(root).maxAverage;
    }

    private State MaxAverage(TreeNode root) {
        if (root == null) {
            return new State(0, 0, 0);
        }

        // postorder traversal, solve for both child nodes first.
        State left = MaxAverage(root.left);
        State right = MaxAverage(root.right);

        // now find nodeCount, valueSum and maxAverage for current node `root`
        int nodeCount = left.nodeCount + right.nodeCount + 1;
        int sum = left.valueSum + right.valueSum + root.val;
        double maxAverage = Math.Max(
            (1.0 * sum) / nodeCount, // average for current node
            Math.Max(right.maxAverage, left.maxAverage) // max average from child nodes
        );

        return new State(nodeCount, sum, maxAverage);
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

type State struct {
    nodeCount  int
    valueSum   int
    maxAverage float64
}

func maximumAverageSubtree(root *TreeNode) float64 {
    return maxAverage(root).maxAverage
}

func maxAverage(root *TreeNode) State {
    if root == nil {
        return State{0, 0, 0}
    }

    // postorder traversal, solve for both child nodes first.
    left := maxAverage(root.Left)
    right := maxAverage(root.Right)

    // now find nodeCount, valueSum and maxAverage for current node `root`
    nodeCount := left.nodeCount + right.nodeCount + 1
    sum := left.valueSum + right.valueSum + root.Val
    avg := float64(sum) / float64(nodeCount)
    maxAvg := avg
    if left.maxAverage > maxAvg {
        maxAvg = left.maxAverage
    }
    if right.maxAverage > maxAvg {
        maxAvg = right.maxAverage
    }

    return State{nodeCount, sum, maxAvg}
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
    // for each node in the tree, we will maintain three values
    data class State(
        val nodeCount: Int,
        val valueSum: Int,
        val maxAverage: Double
    )

    fun maximumAverageSubtree(root: TreeNode?): Double {
        return maxAverage(root).maxAverage
    }

    private fun maxAverage(root: TreeNode?): State {
        if (root == null) {
            return State(0, 0, 0.0)
        }

        // postorder traversal, solve for both child nodes first.
        val left = maxAverage(root.left)
        val right = maxAverage(root.right)

        // now find nodeCount, valueSum and maxAverage for current node `root`
        val nodeCount = left.nodeCount + right.nodeCount + 1
        val sum = left.valueSum + right.valueSum + root.`val`
        val maxAverage = maxOf(
            (1.0 * sum) / nodeCount, // average for current node
            maxOf(right.maxAverage, left.maxAverage) // max average from child nodes
        )

        return State(nodeCount, sum, maxAverage)
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
    struct State {
        let nodeCount: Int
        let valueSum: Int
        let maxAverage: Double
    }

    func maximumAverageSubtree(_ root: TreeNode?) -> Double {
        return maxAverage(root).maxAverage
    }

    private func maxAverage(_ root: TreeNode?) -> State {
        guard let root = root else {
            return State(nodeCount: 0, valueSum: 0, maxAverage: 0)
        }

        // postorder traversal, solve for both child nodes first.
        let left = maxAverage(root.left)
        let right = maxAverage(root.right)

        // now find nodeCount, valueSum and maxAverage for current node `root`
        let nodeCount = left.nodeCount + right.nodeCount + 1
        let sum = left.valueSum + right.valueSum + root.val
        let maxAvg = max(
            Double(sum) / Double(nodeCount), // average for current node
            max(right.maxAverage, left.maxAverage) // max average from child nodes
        )

        return State(nodeCount: nodeCount, valueSum: sum, maxAverage: maxAvg)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(N)$

>  Where $N$ is the number of nodes in the tree
