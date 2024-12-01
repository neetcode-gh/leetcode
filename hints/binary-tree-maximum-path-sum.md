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
    A brute force solution would involve checking the path sum between every pair of nodes in the tree, leading to an <code>O(n^2)</code> time complexity. Can you think of a more efficient approach? Consider what information you would need at each node to calculate the path sum if it passes through the current node.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    At a node, there are three scenarios to compute the maximum path sum that includes the current node. One includes both the left and right subtrees, with the current node as the connecting node. Another path sum includes only one of the subtrees (either left or right), but not both. Another considers the path sum extending from the current node to the parent. However, the parent’s contribution is computed during the traversal at the parent node. Can you implement this? 
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We can use the Depth First Search (DFS) algorithm to traverse the tree. We maintain a global variable to track the maximum path sum. At each node, we first calculate the maximum path sum from the left and right subtrees by traversing them. After that, we compute the maximum path sum at the current node. This approach follows a post-order traversal, where we visit the subtrees before processing the current node.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We return the maximum path sum from the current node to its parent, considering only one of the subtrees (either left or right) to extend the path. While calculating the left and right subtree path sums, we also ensure that we take the maximum with <code>0</code> to avoid negative sums, indicating that we should not include the subtree path in the calculation of the maximum path at the current node.
    </p>
</details>