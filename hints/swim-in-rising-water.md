<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O((n^2)logn)</code> time and <code>O(n^2)</code> space, where <code>n</code> is the number of rows or columns of the square matrix.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    Think of this problem as a graph where each cell represents a node. You can move from one cell to its adjacent cell if the time is greater than or equal to the adjacent cell's elevation. Note that swimming does not cost time, but you may need to wait at a cell for the time to reach the required elevation. What do you notice about the path from <code>(0, 0)</code> to <code>(n - 1, n - 1)</code>? Perhaps a greedy approach would be useful here.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can observe that the maximum elevation value along the path determines the time taken for that path. Therefore, we need to find the path where the maximum elevation is minimized. Can you think of an algorithm to find such a path from the source <code>(0, 0)</code> to the destination <code>(n - 1, n - 1)</code>? Perhaps a shortest path algorithm could be useful here.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We can use Dijkstra's algorithm. We initialize a Min-heap and a matrix with infinity. We run the algorithm starting from the source <code>(0, 0)</code>, and we track the maximum elevation encountered along the paths. This maximum elevation is used as the key for comparison in Dijkstra's algorithm. If we encounter the destination <code>(n - 1, n - 1)</code>, we return the maximum elevation of the path that reached the destination.  
    </p>
</details>
