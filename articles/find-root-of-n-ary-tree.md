## 1. O(n) Space

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
