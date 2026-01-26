## Prerequisites
Before attempting this problem, you should be comfortable with:
- **N-ary Trees** - Understanding tree structures where each node can have multiple children
- **Recursion** - The solution uses recursive tree traversal to compute heights/depths
- **Tree Height vs Depth** - Height is distance down to leaves; depth is distance from root

---

## 1. Distance with Height

The **height** of a node is defined as the length of the longest downward path to a leaf node from that node.

### Intuition
The diameter of a tree is the longest path between any two nodes. This path must pass through some node as the highest point (closest to root). At that node, the path goes down through two different children. So the longest path through any node equals the sum of the two largest heights among its children. By computing heights recursively and tracking the maximum path length, we find the diameter.

### Algorithm
1. Define a recursive function that returns the height of a node (longest path to a leaf descendant).
2. For a leaf node (no children), return height `0`.
3. For each node, track the two largest heights among its children.
4. As we process each child, update the maximum diameter as the sum of the two largest heights found so far.
5. Return the largest child height plus `1` as the current node's height.
6. After traversing the entire tree, return the maximum diameter found.

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

```cpp
class Solution {
protected:
    int dia = 0;

    int height(Node* node) {
        if (node->children.size() == 0)
            return 0;

        int maxHeight1 = 0, maxHeight2 = 0;
        for (Node* child : node->children) {
            int parentHeight = height(child) + 1;
            if (parentHeight > maxHeight1) {
                maxHeight2 = maxHeight1;
                maxHeight1 = parentHeight;
            } else if (parentHeight > maxHeight2) {
                maxHeight2 = parentHeight;
            }
            int distance = maxHeight1 + maxHeight2;
            dia = max(dia, distance);
        }
        return maxHeight1;
    }

public:
    int diameter(Node* root) {
        dia = 0;
        height(root);
        return dia;
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

        const height = (node) => {
            if (node.children.length === 0)
                return 0;

            let maxHeight1 = 0, maxHeight2 = 0;
            for (const child of node.children) {
                const parentHeight = height(child) + 1;
                if (parentHeight > maxHeight1) {
                    maxHeight2 = maxHeight1;
                    maxHeight1 = parentHeight;
                } else if (parentHeight > maxHeight2) {
                    maxHeight2 = parentHeight;
                }
                const distance = maxHeight1 + maxHeight2;
                diameter = Math.max(diameter, distance);
            }
            return maxHeight1;
        };

        height(root);
        return diameter;
    }
}
```

```csharp
public class Solution {
    private int diameter = 0;

    private int Height(Node node) {
        if (node.children.Count == 0)
            return 0;

        int maxHeight1 = 0, maxHeight2 = 0;
        foreach (Node child in node.children) {
            int parentHeight = Height(child) + 1;
            if (parentHeight > maxHeight1) {
                maxHeight2 = maxHeight1;
                maxHeight1 = parentHeight;
            } else if (parentHeight > maxHeight2) {
                maxHeight2 = parentHeight;
            }
            int distance = maxHeight1 + maxHeight2;
            diameter = Math.Max(diameter, distance);
        }
        return maxHeight1;
    }

    public int Diameter(Node root) {
        diameter = 0;
        Height(root);
        return diameter;
    }
}
```

```go
func diameter(root *Node) int {
    dia := 0

    var height func(node *Node) int
    height = func(node *Node) int {
        if len(node.Children) == 0 {
            return 0
        }

        maxHeight1, maxHeight2 := 0, 0
        for _, child := range node.Children {
            parentHeight := height(child) + 1
            if parentHeight > maxHeight1 {
                maxHeight2 = maxHeight1
                maxHeight1 = parentHeight
            } else if parentHeight > maxHeight2 {
                maxHeight2 = parentHeight
            }
            distance := maxHeight1 + maxHeight2
            if distance > dia {
                dia = distance
            }
        }
        return maxHeight1
    }

    height(root)
    return dia
}
```

```kotlin
class Solution {
    private var diameter = 0

    private fun height(node: Node): Int {
        if (node.children.isEmpty())
            return 0

        var maxHeight1 = 0
        var maxHeight2 = 0
        for (child in node.children) {
            val parentHeight = height(child) + 1
            if (parentHeight > maxHeight1) {
                maxHeight2 = maxHeight1
                maxHeight1 = parentHeight
            } else if (parentHeight > maxHeight2) {
                maxHeight2 = parentHeight
            }
            val distance = maxHeight1 + maxHeight2
            diameter = maxOf(diameter, distance)
        }
        return maxHeight1
    }

    fun diameter(root: Node): Int {
        diameter = 0
        height(root)
        return diameter
    }
}
```

```swift
class Solution {
    func diameter(_ root: Node) -> Int {
        var diameter = 0

        func height(_ node: Node) -> Int {
            if node.children.isEmpty {
                return 0
            }

            var maxHeight1 = 0, maxHeight2 = 0
            for child in node.children {
                let parentHeight = height(child) + 1
                if parentHeight > maxHeight1 {
                    maxHeight2 = maxHeight1
                    maxHeight1 = parentHeight
                } else if parentHeight > maxHeight2 {
                    maxHeight2 = parentHeight
                }
                let distance = maxHeight1 + maxHeight2
                diameter = max(diameter, distance)
            }
            return maxHeight1
        }

        height(root)
        return diameter
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

### Intuition
Instead of tracking heights (distance down to leaves), we can track depths (distance from root). The diameter through a node equals the sum of the two deepest leaf paths minus twice the current node's depth. This accounts for the path going down to one leaf, back up to the current node, and down to another leaf.

### Algorithm
1. Define a recursive function that takes a node and its current depth, returning the maximum depth of any leaf in its subtree.
2. For a leaf node, return the current depth.
3. For each node, track the two largest depths found among descendants of its children.
4. Initialize the first maximum depth with the current depth (handles the case of single-child paths).
5. Calculate the diameter through this node as: `max_depth_1 + max_depth_2 - 2 * current_depth`.
6. Update the global diameter if this path is longer.
7. Return the maximum depth found to the parent call.

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

```csharp
public class Solution {
    private int diameter = 0;

    private int MaxDepth(Node node, int currDepth) {
        if (node.children.Count == 0)
            return currDepth;

        int maxDepth1 = currDepth, maxDepth2 = 0;
        foreach (Node child in node.children) {
            int depth = MaxDepth(child, currDepth + 1);
            if (depth > maxDepth1) {
                maxDepth2 = maxDepth1;
                maxDepth1 = depth;
            } else if (depth > maxDepth2) {
                maxDepth2 = depth;
            }
            int distance = maxDepth1 + maxDepth2 - 2 * currDepth;
            diameter = Math.Max(diameter, distance);
        }
        return maxDepth1;
    }

    public int Diameter(Node root) {
        diameter = 0;
        MaxDepth(root, 0);
        return diameter;
    }
}
```

```go
func diameter(root *Node) int {
    dia := 0

    var maxDepth func(node *Node, currDepth int) int
    maxDepth = func(node *Node, currDepth int) int {
        if len(node.Children) == 0 {
            return currDepth
        }

        maxDepth1, maxDepth2 := currDepth, 0
        for _, child := range node.Children {
            depth := maxDepth(child, currDepth+1)
            if depth > maxDepth1 {
                maxDepth2 = maxDepth1
                maxDepth1 = depth
            } else if depth > maxDepth2 {
                maxDepth2 = depth
            }
            distance := maxDepth1 + maxDepth2 - 2*currDepth
            if distance > dia {
                dia = distance
            }
        }
        return maxDepth1
    }

    maxDepth(root, 0)
    return dia
}
```

```kotlin
class Solution {
    private var diameter = 0

    private fun maxDepth(node: Node, currDepth: Int): Int {
        if (node.children.isEmpty())
            return currDepth

        var maxDepth1 = currDepth
        var maxDepth2 = 0
        for (child in node.children) {
            val depth = maxDepth(child, currDepth + 1)
            if (depth > maxDepth1) {
                maxDepth2 = maxDepth1
                maxDepth1 = depth
            } else if (depth > maxDepth2) {
                maxDepth2 = depth
            }
            val distance = maxDepth1 + maxDepth2 - 2 * currDepth
            diameter = maxOf(diameter, distance)
        }
        return maxDepth1
    }

    fun diameter(root: Node): Int {
        diameter = 0
        maxDepth(root, 0)
        return diameter
    }
}
```

```swift
class Solution {
    func diameter(_ root: Node) -> Int {
        var diameter = 0

        func maxDepth(_ node: Node, _ currDepth: Int) -> Int {
            if node.children.isEmpty {
                return currDepth
            }

            var maxDepth1 = currDepth, maxDepth2 = 0
            for child in node.children {
                let depth = maxDepth(child, currDepth + 1)
                if depth > maxDepth1 {
                    maxDepth2 = maxDepth1
                    maxDepth1 = depth
                } else if depth > maxDepth2 {
                    maxDepth2 = depth
                }
                let distance = maxDepth1 + maxDepth2 - 2 * currDepth
                diameter = max(diameter, distance)
            }
            return maxDepth1
        }

        maxDepth(root, 0)
        return diameter
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(N)$

>  Where $N$ is the number of nodes in the tree.

---

## Common Pitfalls

### Only Considering Paths Through the Root

A common mistake is assuming the diameter must pass through the root node. The longest path may be entirely within a subtree. You must track the maximum diameter found at any node, not just the root.

```python
# Wrong: Only checking diameter at root level
def diameter(root):
    heights = [height(child) for child in root.children]
    heights.sort(reverse=True)
    return heights[0] + heights[1] if len(heights) >= 2 else 0

# Correct: Track max diameter across all nodes
def diameter(root):
    max_diameter = 0
    def height(node):
        nonlocal max_diameter
        # ... update max_diameter at every node
    height(root)
    return max_diameter
```

### Confusing Height and Depth Definitions

Height (distance down to leaves) and depth (distance from root) are different concepts. Mixing them up leads to incorrect diameter calculations. Height returns the longest path downward from a node, while depth is passed as a parameter representing distance from root.

```python
# Using height: returns longest path DOWN from node
def height(node):
    if not node.children:
        return 0
    return 1 + max(height(child) for child in node.children)

# Using depth: distance FROM ROOT passed as parameter
def maxDepth(node, curr_depth):
    if not node.children:
        return curr_depth  # Returns absolute depth
    return max(maxDepth(child, curr_depth + 1) for child in node.children)
```

### Only Tracking the Single Maximum Height

To compute the diameter through a node, you need the two largest heights among its children. Tracking only the maximum height misses the second-largest, which is needed for the path length calculation.

```python
# Wrong: Only tracking one maximum
max_height = 0
for child in node.children:
    max_height = max(max_height, height(child) + 1)
diameter = max_height  # Missing the second branch!

# Correct: Track top two heights
max_height_1, max_height_2 = 0, 0
for child in node.children:
    h = height(child) + 1
    if h > max_height_1:
        max_height_1, max_height_2 = h, max_height_1
    elif h > max_height_2:
        max_height_2 = h
diameter = max_height_1 + max_height_2
```