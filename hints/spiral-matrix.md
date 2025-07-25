<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(m*n)</code> time and <code>O(1)</code> extra space, where <code>m</code> is the number of rows and <code>n</code> is the number of columns in the given matrix.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    Try to simulate the process as described in the problem. Think in terms of matrix layers, starting from the outermost boundaries and moving inward. Can you determine an efficient way to implement this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    Each boundary consists of four parts: the top row, right column, bottom row, and left column, which follow the spiral order and act as four pointers. For each layer, the top pointer increments by one, the right pointer decrements by one, the left pointer increments by one, and the bottom pointer decrements by one.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    At each layer, four loops traverse the matrix: one moves left to right along the top row, another moves top to bottom along the right column, the next moves right to left along the bottom row, and the last moves bottom to top along the left column. This process generates the spiral order.
    </p>
</details>
