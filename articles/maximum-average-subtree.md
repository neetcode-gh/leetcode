## 1. Postorder Traversal

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(N)$

>  Where $N$ is the number of nodes in the tree
