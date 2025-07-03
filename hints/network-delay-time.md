<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(ElogV)</code> time and <code>O(V + E)</code> space, where <code>E</code> is the number of edges and <code>V</code> is the number of vertices (nodes).
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    As we are given the source node and we need to find the minimum time to reach all nodes, this represents the shortest path from the source node to all nodes. Can you think of a standard algorithm to find the shortest path from a source to a destination? Maybe a heap-based algorithm is helpful.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use Dijkstra's algorithm to find the shortest path from a source to destination. We end up finding the shortest paths from the source to the nodes that we encounter in finding the destination. So, to find shortest path for all nodes from the source, we need to perform Dijkstra's algorithm until the heap in this algorithm becomes empty. How would you implement this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We use a Min-Heap as we need to find the minimum time. We create an adjacency list for the given times (weighted edges). We also initialize an array <code>dist[]</code> of size <code>n</code> (number of nodes) which represents the distance from the source to all nodes, initialized with infinity. We put <code>dist[source] = 0</code>. Then we continue the algorithm. After the heap becomes empty, if we don't visit any node, we return <code>-1</code>; otherwise, we return the time.
    </p>
</details>
