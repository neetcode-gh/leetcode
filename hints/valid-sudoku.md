<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(n^2)</code> time and <code>O(n^2)</code> space, where <code>n</code> is the number of rows in the square grid.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    Which data structure would you prefer to use for checking duplicates?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    You can use a hash set for every row and column to check duplicates. But how can you efficiently check for the squares?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We can find the index of each square by the equation <code>(row / 3) * 3 + (col / 3)</code>. Then we use hash set for <code>O(1)</code> lookups while inserting the number into its row, column and square it belongs to. We use separate hash maps for rows, columns, and squares.
    </p>
</details>