<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(m*n)</code> time and <code>O(1)</code> space, where <code>m</code> is the number of rows and <code>n</code> is the number of columns in the given matrix.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force approach would iterate through the given matrix and update the corresponding row and column in a new matrix on the fly. This would result in an <code>O((m*n)*(m+n))</code> time and <code>O(m*n)</code> space solution. Can you think of a better way? Maybe you should consider using a single variable for a row and a single variable for a column instead of updating entire row and column.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    A better approach is to use <code>O(m+n)</code> boolean arrays. We iterate through the matrix, and when encountering a zero, we mark the respective row and column as <code>true</code>. In the second iteration, we set a cell to <code>0</code> if its corresponding row or column is marked <code>true</code>. Can you think of a way to optimize the space further?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We can use the topmost row and leftmost column of the matrix as boolean arrays by marking <code>0</code> instead of <code>true</code>. However, since they overlap at one cell, we use a single variable to track the top row separately. We then iterate through the matrix and mark zeros accordingly.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    In the second iteration, we update all cells that are not part of the top row or left column accordingly. After making the necessary changes, we check the top-leftmost cell and update the corresponding column. Finally, we check the extra variable and update the top row accordingly.
    </p>
</details>
