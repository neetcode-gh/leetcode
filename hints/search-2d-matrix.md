<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(log(m * n))</code> time and <code>O(1)</code> space, where <code>m</code> is the number of rows and <code>n</code> is the number of columns in the matrix.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A brute force solution would be to do a linear search on the matrix. This would be an <code>O(m * n)</code> solution. Can you think of a better way? Maybe an efficient searching algorithm, as the given matrix is sorted.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use binary search, which is particularly effective when we visualize a row as a range of numbers, <code>[x, y]</code> where <code>x</code> is the first cell and <code>y</code> is the last cell of a row. Using this representation, it becomes straightforward to check if the target value falls within the range. How can you use binary search to solve the problem?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We perform a binary search on the rows to identify the row in which the target value might fall. This operation takes <code>O(logm)</code> time, where <code>m</code> is the number of rows. Now, when we find the potential row, can you find the best way to search the target in that row? The sorted nature of each row is the hint.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    Once we identify the potential row where the target might exist, we can perform a binary search on that row which acts as a one dimensional array. It takes <code>O(logn)</code> time, where <code>n</code> is the number of columns in the row.
    </p>
</details>