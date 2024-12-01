<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(m * n)</code> time and <code>O(m * n)</code> space, where <code>m</code> is the number of rows and <code>n</code> is the number of columns in the given grid.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    The DFS algorithm is not suitable for this problem because it explores nodes deeply rather than level by level. In this scenario, we need to determine which oranges rot at each second, which naturally fits a level-by-level traversal. Can you think of an algorithm designed for such a traversal?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use the Breadth First Search (BFS) algorithm. At each second, we rot the oranges that are adjacent to the rotten ones. So, we store the rotten oranges in a queue and process them in one go. The time at which a fresh orange gets rotten is the level at which it is visited. How would you implement it?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We traverse the grid and store the rotten oranges in a queue. We then run a BFS, processing the current level of rotten oranges and visiting the adjacent cells of each rotten orange. We only insert the adjacent cell into the queue if it contains a fresh orange. This process continues until the queue is empty. The level at which the BFS stops is the answer. However, we also need to check whether all oranges have rotted by traversing the grid. If any fresh orange is found, we return <code>-1</code>; otherwise, we return the level.
    </p>
</details>