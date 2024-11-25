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
    We can use the Depth First Search (DFS) algorithm to traverse each group by starting at a cell with <code>1</code> and recursively visiting all the cells that are reachable from that cell and are also <code>1</code>. Can you think about how to find the area of that island? How would you implement this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We traverse the grid, and when we encounter a <code>1</code>, we initialize a variable <code>area</code>. We then start a DFS from that cell to visit all connected <code>1</code>'s recursively, marking them as <code>0</code> to indicate they are visited. At each recursion step, we increment <code>area</code>. After completing the DFS, we update <code>maxArea</code>, which tracks the maximum area of an island in the grid, if <code>maxArea < area</code>. Finally, after traversing the grid, we return <code>maxArea</code>.
    </p>
</details>