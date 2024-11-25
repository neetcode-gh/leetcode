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
    A brute force solution would be to traverse each cell in the grid and run a BFS from each cell to check if it can reach both oceans. This would result in an <code>O((m * n)^2)</code> solution. Can you think of a better way? Maybe you should consider a reverse way of traversing.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use the Depth First Search (DFS) algorithm starting from the border cells of the grid. However, we reverse the condition such that the next visiting cell should have a height greater than or equal to the current cell. For the top and left borders connected to the Pacific Ocean, we use a hash set called <code>pacific</code> and run a DFS from each of these cells, visiting nodes recursively. Similarly, for the bottom and right borders connected to the Atlantic Ocean, we use a hash set called <code>atlantic</code> and run a DFS. The required coordinates are the cells that exist in both the <code>pacific</code> and <code>atlantic</code> sets. How do you implement this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We perform DFS from the border cells, using their respective hash sets. During the DFS, we recursively visit the neighbouring cells that are unvisited and have height greater than or equal to the current cell's height and add the current cell's coordinates to the corresponding hash set. Once the DFS completes, we traverse the grid and check if a cell exists in both the hash sets. If so, we add that cell to the result list.
    </p>
</details>