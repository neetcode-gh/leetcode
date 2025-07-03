<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O((n^2)logn)</code> time and <code>O(n^2)</code> space, where <code>n</code> is the number of points.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    Think of this problem as a graph, where the given points represent nodes. We need to connect these nodes into a single component by creating edges. Can you think of an advanced graph algorithm that can be used to connect all points into one component?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We use Kruskal's algorithm along with Union-Find (DSU) to connect nodes into components. The final component forms the minimum spanning tree (MST), where the edges between nodes are weighted by the Manhattan distance, and the total weight of the tree is minimized. How would you implement this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We create the possible edges by iterating through every pair of points and calculating the weights as the Manhattan distance between them. Next, we sort the edges in ascending order based on their weights, as we aim to minimize the cost. Then, we traverse through these edges, connecting the nodes and adding the weight of the edge to the total cost if the edge is successfully added. The final result will be the minimum cost.
    </p>
</details>
