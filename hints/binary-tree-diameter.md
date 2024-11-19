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
    The diameter of a binary tree is the maximum among the sums of the left height and right height of the nodes in the tree. Why?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    Because the diameter of a binary tree is defined as the longest path between any two nodes in the tree. The path may or may not pass through the root. For any given node, the longest path that passes through it is the sum of the height of its left subtree and the height of its right subtree.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    A brute force solution would be to go through every node in the tree and compute its left height and right height, returning the maximum diameter found. This would be an <code>O(n^2)</code> solution. Can you think of a better way? Maybe we can compute the diameter as we calculate the height of the tree? Think about what information you need from each subtree during a single traversal.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We can use the Depth First Search (DFS) algorithm to calculate the height of the tree. At each node, the subtrees return their respective heights (leftHeight and rightHeight). Then we calculate the diameter at that node as <code>d = leftHeight + rightHeight</code>. We use a global variable to update the maximum diameter as needed during the traversal.
    </p>
</details>