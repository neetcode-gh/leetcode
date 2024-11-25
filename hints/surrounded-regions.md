<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(m * n)</code> time and <code>O(m * n)</code> space, where <code>m</code> is the number of rows and <code>n</code> is the number of columns in the matrix.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    We observe that we need to capture the regions that are not connected to the <code>O</code>'s on the border of the matrix. This means there should be no path connecting the <code>O</code>'s on the border to any <code>O</code>'s in the region. Can you think of a way to check the region connected to these border <code>O</code>'s?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use the Depth First Search (<code>DFS</code>) algorithm. Instead of checking the region connected to the border <code>O</code>'s, we can reverse the approach and mark the regions that are reachable from the border <code>O</code>'s. How would you implement this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We run the DFS from every <code>'O'</code> on the border of the matrix, visiting the neighboring cells that are equal to <code>'O'</code> recursively and marking them as <code>'#'</code> to avoid revisiting. After completing all the DFS calls, we traverse the matrix again and capture the cells where <code>matrix[i][j] == 'O'</code>, and unmark the cells back to <code>'O'</code> where <code>matrix[i][j] == '#'</code>.
    </p>
</details>