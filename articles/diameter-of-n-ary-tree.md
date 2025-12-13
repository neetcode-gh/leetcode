## 1. Distance with Height

The **height** of a node is defined as the length of the longest downward path to a leaf node from that node.

::tabs-start

```python
class Solution:
    def diameter(self, root: 'Node') -> int:
        diameter = 0

        def height(node):
            """ return the height of the node """
            nonlocal diameter

            if len(node.children) == 0:
                return 0

            # select the top two heights
            max_height_1, max_height_2 = 0, 0
            for child in node.children:
                parent_height = height(child) + 1
                if parent_height > max_height_1:
                    max_height_1, max_height_2 = parent_height, max_height_1
                elif parent_height > max_height_2:
                    max_height_2 = parent_height

            # calculate the distance between the two farthest leaves nodes.
            distance = max_height_1 + max_height_2
            diameter = max(diameter, distance)

            return max_height_1

        height(root)
        return diameter
```

```java
class Solution {
    protected int diameter = 0;

    /**
     * return the height of the node
     */
    protected int height(Node node) {
        if (node.children.size() == 0)
            return 0;

        // select the top two largest heights
        int maxHeight1 = 0, maxHeight2 = 0;
        for (Node child : node.children) {
            int parentHeight = height(child) + 1;
            if (parentHeight > maxHeight1) {
                maxHeight2 = maxHeight1;
                maxHeight1 = parentHeight;
            } else if (parentHeight > maxHeight2) {
                maxHeight2 = parentHeight;
            }
            // calculate the distance between the two farthest leaves nodes.
            int distance = maxHeight1 + maxHeight2;
            this.diameter = Math.max(this.diameter, distance);
        }

        return maxHeight1;
    }

    public int diameter(Node root) {
        this.diameter = 0;
        height(root);
        return diameter;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(N)$

>  Where $N$ is the number of nodes in the tree.

---

## 2. Distance with Depth

The **depth** of a node is the length of the path to the **root** node.

::tabs-start

```python

class Solution:
    def diameter(self, root: 'Node') -> int:
        diameter = 0

        def maxDepth(node, curr_depth):
            """ return the maximum depth of leaves nodes
                 descending from the current node
            """
            nonlocal diameter

            if len(node.children) == 0:
                return curr_depth
            
            # select the top 2 depths from its children
            max_depth_1, max_depth_2 = curr_depth, 0
            for child in node.children:
                depth = maxDepth(child, curr_depth+1)
                if depth > max_depth_1:
                    max_depth_1, max_depth_2 = depth, max_depth_1
                elif depth > max_depth_2:
                    max_depth_2 = depth

            # calculate the distance between the two farthest leaves nodes
            distance = max_depth_1 + max_depth_2 - 2 * curr_depth
            diameter = max(diameter, distance)

            return max_depth_1

        maxDepth(root, 0)
        return diameter
```

```java
class Solution {
    protected int diameter = 0;

    /**
     * return the maximum depth of leaves nodes descending from the given node
     */
    protected int maxDepth(Node node, int currDepth) {
        if (node.children.size() == 0)
            return currDepth;

        // select the top two largest depths
        int maxDepth1 = currDepth, maxDepth2 = 0;
        for (Node child : node.children) {
            int depth = maxDepth(child, currDepth + 1);
            if (depth > maxDepth1) {
                maxDepth2 = maxDepth1;
                maxDepth1 = depth;
            } else if (depth > maxDepth2) {
                maxDepth2 = depth;
            }
            // calculate the distance between the two farthest leaves nodes.
            int distance = maxDepth1 + maxDepth2 - 2 * currDepth;
            this.diameter = Math.max(this.diameter, distance);
        }

        return maxDepth1;
    }

    public int diameter(Node root) {
        this.diameter = 0;
        maxDepth(root, 0);
        return diameter;
    }
}
```

```cpp
class Solution {
protected:
    int diameter = 0;
    
    /**
     * return the maximum depth of leaves nodes descending from the given node
     */
    int maxDepth(Node* node, int currDepth) {
        if (node->children.size() == 0)
            return currDepth;
        
        // select the top two largest depths
        int maxDepth1 = currDepth, maxDepth2 = 0;
        for (Node* child : node->children) {
            int depth = maxDepth(child, currDepth + 1);
            if (depth > maxDepth1) {
                maxDepth2 = maxDepth1;
                maxDepth1 = depth;
            } else if (depth > maxDepth2) {
                maxDepth2 = depth;
            }
            // calculate the distance between the two farthest leaves nodes.
            int distance = maxDepth1 + maxDepth2 - 2 * currDepth;
            this->diameter = max(this->diameter, distance);
        }
        return maxDepth1;
    }
    
public:
    int diameter(Node* root) {
        this->diameter = 0;
        maxDepth(root, 0);
        return diameter;
    }
};
```

```javascript
class Solution {
    /**
     * @param {_Node} root
     * @return {number}
     */
    diameter(root) {
        let diameter = 0;
        
        const maxDepth = (node, curr_depth) => {
            /* return the maximum depth of leaves nodes
                 descending from the current node
            */
            if (node.children.length === 0) {
                return curr_depth;
            }
            
            // select the top 2 depths from its children
            let max_depth_1 = curr_depth, max_depth_2 = 0;
            for (const child of node.children) {
                const depth = maxDepth(child, curr_depth + 1);
                if (depth > max_depth_1) {
                    max_depth_2 = max_depth_1;
                    max_depth_1 = depth;
                } else if (depth > max_depth_2) {
                    max_depth_2 = depth;
                }
            }
            
            // calculate the distance between the two farthest leaves nodes
            const distance = max_depth_1 + max_depth_2 - 2 * curr_depth;
            diameter = Math.max(diameter, distance);
            
            return max_depth_1;
        };
        
        maxDepth(root, 0);
        return diameter;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(N)$

>  Where $N$ is the number of nodes in the tree.
