<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(m * n)</code> time and <code>O(m * n)</code> space, where <code>m</code> is the number of rows and <code>n</code> is the number of columns in the given matrix.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    If we move from one cell to an adjacent cell with a greater value, we won't revisit a cell, as the path is strictly increasing. A brute force approach would be to run a <code>dfs</code> from every cell and return the longest path found. This approach is exponential. Can you think of a way to optimize it to avoid redundant calculations?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use memoization to cache the results of recursive calls and avoid redundant computations. A hash map or a <code>2D</code> array can be used to store these results.
    </p>
</details>
