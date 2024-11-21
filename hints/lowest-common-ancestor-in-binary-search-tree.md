<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(h)</code> time and <code>O(h)</code> space, where <code>h</code> is the height of the given tree.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A Binary Search Tree (BST) is a tree in which the values of all nodes in the left subtree of a node are less than the node's value, and the values of all nodes in the right subtree are greater than the node's value. Additionally, every subtree of a BST must also satisfy this property, meaning the "less than" or "greater than" condition is valid for all nodes in the tree, not just the root. How can you use this idea to find the LCA of the given nodes in the tree?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use recursion to traverse the tree. Can you figure out the conditions we encounter when choosing a path between the left and right subtrees during traversal using the values of the two given nodes? Perhaps you can determine the LCA by traversing based on these conditions.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    If nodes <code>p</code> and <code>q</code> are in different subtrees, a split occurs, making the current node the LCA. If both are in the left or right subtree, the LCA lies in that subtree and we further choose that subtree to traverse using recursion. You should also handle other multiple scenarios to get the LCA.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    The LCA can also be one of the nodes, <code>p</code> or <code>q</code>, if the current node is equal to either of them. This is because if we encounter either <code>p</code> or <code>q</code> during the traversal, that node is the LCA.
    </p>
</details>