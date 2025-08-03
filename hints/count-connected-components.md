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
    Assume there are no edges initially, so we have <code>n</code> components, as there are that many nodes given. Now, we should add the given edges between the nodes. Can you think of an algorithm to add the edges between the nodes? Also, after adding an edge, how do you determine the number of components left?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use the Union-Find (DSU) algorithm to add the given edges. For simplicity, we use Union-Find by size, where we merge the smaller component into the larger one. The Union-Find algorithm inserts the edge only between two nodes from different components. It does not add the edge if the nodes are from the same component. How do you find the number of components after adding the edges? For example, consider that nodes <code>0</code> and <code>1</code> are not connected, so there are initially two components. After adding an edge between these nodes, they become part of the same component, leaving us with one component.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We create an object of the DSU and initialize the result variable <code>res = n</code>, which indicates that there are <code>n</code> components initially. We then iterate through the given edges. For each edge, we attempt to connect the nodes using the union function of the DSU. If the union is successful, we decrement <code>res</code>; otherwise, we continue. Finally, we return <code>res</code> as the number of components.
    </p>
</details>
