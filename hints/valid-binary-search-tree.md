<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n)</code> time and <code>O(n)</code> space, where <code>n</code> is the number of nodes in the given tree.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force solution would involve traversing the tree and, for every node, checking its entire left subtree to ensure all nodes are less than the current node, and its entire right subtree to ensure all nodes are greater. This results in an <code>O(n^2)</code> solution. Can you think of a better way? Maybe tracking values during the traversal would help.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use the Depth First Search (DFS) algorithm to traverse the tree. At each node, we need to ensure that the tree rooted at that node is a valid Binary Search Tree (BST). One way to do this is by tracking an interval that defines the lower and upper limits for the node's value in that subtree. This interval will be updated as we move down the tree, ensuring each node adheres to the BST property.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We start with the interval <code>[-infinity, infinity]</code> for the root node. As we traverse the tree, when checking the left subtree, we update the maximum value limit because all values in the left subtree must be less than the current node's value. Conversely, when checking the right subtree, we update the minimum value limit because all values in the right subtree must be greater than the current node's value.
    </p>
</details>