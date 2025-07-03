<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(m * n)</code> time and <code>O(m * n)</code> space, where <code>m</code> is the number of rows and <code>n</code> is the number of columns in the grid.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    Try to think in terms of recursion and visualize it as a decision tree, where we have two choices at each step. Can you determine the base condition and recurrence relation?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We recursively traverse the grid using row <code>i</code> and column <code>j</code>. At each step, we explore both possibilities: moving down or moving right, ensuring we do not go out of bounds. If we reach the bottom-right cell, we return <code>1</code>.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    This approach has exponential complexity. Can you think of a way to optimize the recursion? Maybe you should consider using a dynamic programming approach.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We can use memoization to cache the results of recursive calls and avoid recalculations. A hash map or a <code>2D</code> array can be used to store these results.
    </p>
</details>
