<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(V + E)</code> time and <code>O(V + E)</code> space, where <code>V</code> is the number vertices and <code>E</code> is the number of edges in the graph.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    There will be only one edge that creates the cycle in the given problem. Why? Because the graph is initially acyclic, and a cycle is formed only after adding one extra edge that was not present in the graph initially. Can you think of an algorithm that helps determine whether the current connecting edge forms a cycle? Perhaps a component-oriented algorithm?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use the Union-Find (DSU) algorithm to create the graph from the given edges. While connecting the edges, if we fail to connect any edge, it means this is the redundant edge, and we return it. How would you implement this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We create an instance of the DSU object and traverse through the given edges. For each edge, we attempt to connect the nodes using the union function. If the union function returns <code>false</code>, indicating that the current edge forms a cycle, we immediately return that edge.
    </p>
</details>
