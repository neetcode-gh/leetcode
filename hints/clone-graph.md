<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(V + E)</code> time and <code>O(E)</code> space, where <code>V</code> is the number of vertices and <code>E</code> is the number of edges in the given graph.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    We are given only the reference to the node in the graph. Cloning the entire graph means we need to clone all the nodes as well as their child nodes. We can't just clone the node and its neighbor and return the node. We also need to clone the entire graph. Can you think of a recursive way to do this, as we are cloning nodes in a nested manner? Also, can you think of a data structure that can store the nodes with their cloned references?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use the Depth First Search (DFS) algorithm. We use a hash map to map the nodes to their cloned nodes. We start from the given node. At each step of the DFS, we create a node with the current node's value. We then recursively go to the current node's neighbors and try to clone them first. After that, we add their cloned node references to the current node's neighbors list. Can you think of a base condition to stop this recursive path?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We stop this recursive path when we encounter a node that has already been cloned or visited. This DFS approach creates an exact clone of the given graph, and we return the clone of the given node.
    </p>
</details>