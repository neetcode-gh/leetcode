<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n!)</code> time and <code>O(n^2)</code> space, where <code>n</code> is the size of the given square board.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    A queen can move in <code>8</code> directions, and no two queens can be in the same row or column. This means we can place one queen per row or column. We iterate column-wise and try to place a queen in each column while ensuring no other queen exists in the same row, left diagonal, or left bottom diagonal. Can you think of a recursive algorithm to find all possible combinations?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use backtracking to traverse through the columns with index <code>c</code> while maintaining a board that represents the current state in the recursive path. We reach the base condition when <code>c == n</code> and we add a copy of the board to the result. How would you implement this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We initialize an empty board and recursively go through each column. For each column, we check each cell to see if we can place a queen there. We use a function to check if the cell is suitable by iterating along the left directions and verifying if the same row, left diagonal, or left bottom diagonal are free. If it is possible, we place the queen on the board, move along the recursive path, and then backtrack by removing the queen to continue to the next cell in the column.
    </p>
</details>