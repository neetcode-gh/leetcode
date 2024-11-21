<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n)</code> time and<code>O(n)</code> space, where <code>n</code> is the number of nodes in the given tree.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force solution would involve considering every node and checking if the path from the root to that node is valid, resulting in an <code>O(n^2)</code> time complexity. Can you think of a better approach?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use the Depth First Search (DFS) algorithm to traverse the tree. But can you think of a way to determine if the current node is a good node in a single traversal? Maybe we need to track a value while traversing the tree.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    While traversing the tree, we should track the maximum value along the current path. This allows us to determine whether the nodes we encounter are good. We can use a global variable to count the number of good nodes.
    </p>
</details>