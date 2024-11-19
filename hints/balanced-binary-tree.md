<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n)</code> time and <code>O(n)</code> space, where <code>n</code> is the number of nodes in the tree.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force solution would involve traversing every node and checking whether the tree rooted at each node is balanced by computing the heights of its left and right subtrees. This approach would result in an <code>O(n^2)</code> solution. Can you think of a more efficient way? Perhaps you could avoid repeatedly computing the heights for every node by determining balance and height in a single traversal.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use the Depth First Search (DFS) algorithm to compute the heights at each node. While calculating the heights of the left and right subtrees, we also check if the tree rooted at the current node is balanced. If <code>leftHeight - rightHeight > 1</code>, we update a global variable, such as <code>isBalanced = False</code>. After traversing all the nodes, the value of <code>isBalanced</code> indicates whether the entire tree is balanced or not.
    </p>
</details>