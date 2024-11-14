<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(n<sup>2</sup>)</code> time and <code>O(n<sup>2</sup>)</code> space, where <code>n</code> is the number of rows in the square grid.
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
    We can find the index of each square by the equation <code>(row / 3) * 3 + (col / 3)</code>.
    </p>
</details>