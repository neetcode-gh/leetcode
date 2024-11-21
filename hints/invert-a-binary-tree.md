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
    From the diagram, you can see that the left and right children of every node in the tree are swapped. Can you think of a way to achieve this recursively? Maybe an algorithm that is helpful to traverse the tree.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use the Depth First Search (DFS) algorithm. At each node, we swap its left and right children by swapping their pointers. This inverts the current node, but every node in the tree also needs to be inverted. To achieve this, we recursively visit the left and right children and perform the same operation. If the current node is <code>null</code>, we simply return.
    </p>
</details>