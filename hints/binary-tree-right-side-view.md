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
    In the right-side view of a tree, can you identify the nodes that are visible? Maybe you could traverse the tree level by level and determine which nodes are visible from the right side.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    The nodes visible in the right-side view are the last nodes at each level of the tree. Can you think of an algorithm to identify these nodes? Maybe an algorithm that can traverse the tree level by level.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We can use the Breadth First Search (BFS) algorithm to traverse the tree level by level. Once we completely visit a level, we take the last node of that level and add it to the result array. After processing all levels, we return the result.
    </p>
</details>