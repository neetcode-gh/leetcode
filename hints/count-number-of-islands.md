<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(m * n)</code> time and <code>O(m * n)</code> space, where <code>m</code> is the number of rows and <code>n</code> is the number of columns in the grid.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    An island is a group of <code>1</code>'s in which every <code>1</code> is reachable from any other <code>1</code> in that group. Can you think of an algorithm that can find the number of groups by visiting a group only once? Maybe there is a recursive way of doing it.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use the Depth First Search (DFS) algorithm to traverse each group independently. We iterate through each cell of the grid. When we encounter a <code>1</code>, we perform a DFS starting at that cell and recursively visit every other <code>1</code> that is reachable. During this process, we mark the visited <code>1</code>'s as <code>0</code> to ensure we don't revisit them, as they belong to the same group. The number of groups corresponds to the number of islands.
    </p>
</details>