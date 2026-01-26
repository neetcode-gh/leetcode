## Prerequisites
Before attempting this problem, you should be comfortable with:
- **N-ary Trees** - Understanding tree structures where nodes can have multiple children
- **Hash Sets** - Using sets for O(1) lookups to track seen values
- **Tree Properties** - Recognizing that the root is the only node not appearing as any other node's child

---

## 1. O(n) Space

### Intuition

The root of a tree is the only node that is never a child of any other node. By collecting all child nodes into a set, we can identify the root as the node whose value does not appear in the set. Every non-root node will appear exactly once as someone's child, but the root never will.

### Algorithm

1. Create a set to store all child node values.
2. Iterate through every node in the tree and add all of its children's values to the set.
3. Iterate through the tree again and find the node whose value is not in the `seen` set.
4. Return that node as the root.

::tabs-start

```python
class Solution:
    def findRoot(self, tree: List['Node']) -> 'Node':
        # set that contains all the child nodes.
        seen = set()

        # add all the child nodes into the set
        for node in tree:
            for child in node.children:
                # we could either add the value or the node itself.
                seen.add(child.val)

        # find the node that is not in the child node set.
        for node in tree:
            if node.val not in seen:
                return node
```

```java
class Solution {
    public Node findRoot(List<Node> tree) {
        // set that contains all the child nodes.
        HashSet<Integer> seen = new HashSet<Integer>();

        // add all the child nodes into the set
        for (Node node : tree) {
            for (Node child : node.children)
                // we could either add the value or the node itself.
                seen.add(child.val);
        }

        Node root = null;
        // find the node that is not in the child node set.
        for (Node node : tree) {
            if (!seen.contains(node.val)) {
                root = node;
                break;
            }
        }
        return root;
    }
}
```

```cpp
class Solution {
public:
    Node* findRoot(vector<Node*> tree) {
        // set that contains all the child nodes.
        unordered_set<int> seen;
        
        // add all the child nodes into the set
        for (Node* node : tree) {
            for (Node* child : node->children) {
                // we could either add the value or the node itself.
                seen.insert(child->val);
            }
        }
        
        Node* root = nullptr;
        // find the node that is not in the child node set.
        for (Node* node : tree) {
            if (seen.find(node->val) == seen.end()) {
                root = node;
                break;
            }
        }
        
        return root;
    }
};
```

```javascript
class Solution {
    /**
     * @param {_Node[]} tree
     * @return {_Node}
     */
    findRoot(tree) {
        // set that contains all the child nodes.
        const seen = new Set();

        // add all the child nodes into the set
        for (const node of tree) {
            for (const child of node.children) {
                // we could either add the value or the node itself.
                seen.add(child.val);
            }
        }

        let root = null;
        // find the node that is not in the child node set.
        for (const node of tree) {
            if (!seen.has(node.val)) {
                root = node;
                break;
            }
        }

        return root;
    }
}
```

```csharp
public class Solution {
    public Node FindRoot(List<Node> tree) {
        // set that contains all the child nodes.
        HashSet<int> seen = new HashSet<int>();

        // add all the child nodes into the set
        foreach (Node node in tree) {
            foreach (Node child in node.children) {
                // we could either add the value or the node itself.
                seen.Add(child.val);
            }
        }

        Node root = null;
        // find the node that is not in the child node set.
        foreach (Node node in tree) {
            if (!seen.Contains(node.val)) {
                root = node;
                break;
            }
        }

        return root;
    }
}
```

```go
func findRoot(tree []*Node) *Node {
    // set that contains all the child nodes.
    seen := make(map[int]bool)

    // add all the child nodes into the set
    for _, node := range tree {
        for _, child := range node.Children {
            // we could either add the value or the node itself.
            seen[child.Val] = true
        }
    }

    // find the node that is not in the child node set.
    for _, node := range tree {
        if !seen[node.Val] {
            return node
        }
    }

    return nil
}
```

```kotlin
class Solution {
    fun findRoot(tree: List<Node>): Node? {
        // set that contains all the child nodes.
        val seen = HashSet<Int>()

        // add all the child nodes into the set
        for (node in tree) {
            for (child in node.children) {
                // we could either add the value or the node itself.
                seen.add(child.`val`)
            }
        }

        // find the node that is not in the child node set.
        for (node in tree) {
            if (node.`val` !in seen) {
                return node
            }
        }

        return null
    }
}
```

```swift
class Solution {
    func findRoot(_ tree: [Node]) -> Node? {
        // set that contains all the child nodes.
        var seen = Set<Int>()

        // add all the child nodes into the set
        for node in tree {
            for child in node.children {
                // we could either add the value or the node itself.
                seen.insert(child.val)
            }
        }

        // find the node that is not in the child node set.
        for node in tree {
            if !seen.contains(node.val) {
                return node
            }
        }

        return nil
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(N)$

>  Where $N$ is the length of the input list, which is also the number of nodes in the N-ary tree.

---

## 2. O(1) Space

### Intuition

Every node except the root appears exactly once as a parent and exactly once as a child. If we add each node's value as a parent and subtract each child's value, all non-root nodes will cancel out (added once, subtracted once). The root is only added as a parent but never subtracted as a child, so the final sum equals the root's value.

### Algorithm

1. Initialize `valueSum = 0`.
2. For each node in the tree:
   - Add the node's value to `valueSum` (counting it as a parent).
   - Subtract each child's value from `valueSum` (counting it as a child).
3. Find and return the node whose value equals `valueSum`.

::tabs-start

```python
class Solution:
    def findRoot(self, tree: List['Node']) -> 'Node':
        value_sum = 0

        for node in tree:
            # the value is added as a parent node
            value_sum += node.val
            for child in node.children:
                # the value is deducted as a child node.
                value_sum -= child.val

        # the value of the root node is `value_sum`
        for node in tree:
            if node.val == value_sum:
                return node
```

```java
class Solution {
    public Node findRoot(List<Node> tree) {

        Integer valueSum = 0;

        for (Node node : tree) {
            // the value is added as a parent node
            valueSum += node.val;
            for (Node child : node.children)
                // the value is deducted as a child node.
                valueSum -= child.val;
        }

        Node root = null;
        // the value of the root node is `valueSum`
        for (Node node : tree) {
            if (node.val == valueSum) {
                root = node;
                break;
            }
        }
        return root;
    }
}
```

```cpp
class Solution {
public:
    Node* findRoot(vector<Node*> tree) {
        int value_sum = 0;
        
        for (Node* node : tree) {
            // the value is added as a parent node
            value_sum += node->val;
            for (Node* child : node->children) {
                // the value is deducted as a child node.
                value_sum -= child->val;
            }
        }

        // the value of the root node is `value_sum`
        for (Node* node : tree) {
            if (node->val == value_sum) {
                return node;
            }
        }
        return nullptr;
    }
};
```

```javascript
class Solution {
    /**
     * @param {_Node[]} tree
     * @return {_Node}
     */
    findRoot(tree) {
        let value_sum = 0;

        for (let node of tree) {
            // the value is added as a parent node
            value_sum += node.val;
            for (let child of node.children) {
                // the value is deducted as a child node.
                value_sum -= child.val;
            }
        }

        // the value of the root node is `value_sum`
        for (let node of tree) {
            if (node.val === value_sum) {
                return node;
            }
        }
        return null;
    }
}
```

```csharp
public class Solution {
    public Node FindRoot(List<Node> tree) {
        int valueSum = 0;

        foreach (Node node in tree) {
            // the value is added as a parent node
            valueSum += node.val;
            foreach (Node child in node.children) {
                // the value is deducted as a child node.
                valueSum -= child.val;
            }
        }

        // the value of the root node is `valueSum`
        foreach (Node node in tree) {
            if (node.val == valueSum) {
                return node;
            }
        }
        return null;
    }
}
```

```go
func findRoot(tree []*Node) *Node {
    valueSum := 0

    for _, node := range tree {
        // the value is added as a parent node
        valueSum += node.Val
        for _, child := range node.Children {
            // the value is deducted as a child node.
            valueSum -= child.Val
        }
    }

    // the value of the root node is `valueSum`
    for _, node := range tree {
        if node.Val == valueSum {
            return node
        }
    }
    return nil
}
```

```kotlin
class Solution {
    fun findRoot(tree: List<Node>): Node? {
        var valueSum = 0

        for (node in tree) {
            // the value is added as a parent node
            valueSum += node.`val`
            for (child in node.children) {
                // the value is deducted as a child node.
                valueSum -= child.`val`
            }
        }

        // the value of the root node is `valueSum`
        for (node in tree) {
            if (node.`val` == valueSum) {
                return node
            }
        }
        return null
    }
}
```

```swift
class Solution {
    func findRoot(_ tree: [Node]) -> Node? {
        var valueSum = 0

        for node in tree {
            // the value is added as a parent node
            valueSum += node.val
            for child in node.children {
                // the value is deducted as a child node.
                valueSum -= child.val
            }
        }

        // the value of the root node is `valueSum`
        for node in tree {
            if node.val == valueSum {
                return node
            }
        }
        return nil
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(1)$

>  Where $N$ is the length of the input list, which is also the number of nodes in the N-ary tree.

---

## Common Pitfalls

### Confusing Node Values with Node References

When building the set of child nodes, you can store either the node's value or the node reference itself. However, be consistent. If you store values, compare values when finding the root. If you store references, compare references. Mixing the two leads to incorrect results.

### Assuming the Root is Always at Index 0

The input list contains nodes in arbitrary order, not level-order or any specific traversal order. Never assume the root appears first in the list. Always iterate through all nodes to identify which one is not a child of any other.

### Integer Overflow in the Sum Approach

When using the O(1) space solution that adds parent values and subtracts child values, be aware of potential integer overflow for very large trees with large node values. In languages with fixed-size integers, the sum could overflow before the final cancellation produces the correct root value.
