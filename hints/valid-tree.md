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
    According to the definition of a tree, a tree is an undirected graph with no cycles, all the nodes are connected as one component, and any two nodes have exactly one path. Can you think of a recursive algorithm to detect a cycle in the given graph and ensure it is a tree?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use the Depth First Search (DFS) algorithm to detect a cycle in the graph. Since a tree has only one component, we can start the DFS from any node, say node <code>0</code>. During the traversal, we recursively visit its neighbors (children). If we encounter any already visited node that is not the parent of the current node, we return false as it indicates a cycle. How would you implement this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We start DFS from node <code>0</code>, assuming <code>-1</code> as its parent. We initialize a hash set <code>visit</code> to track the visited nodes in the graph. During the DFS, we first check if the current node is already in <code>visit</code>. If it is, we return false, detecting a cycle. Otherwise, we mark the node as visited and perform DFS on its neighbors, skipping the parent node to avoid revisiting it. After all DFS calls, if we have visited all nodes, we return true, as the graph is connected. Otherwise, we return false because a tree must contain all nodes.
    </p>
</details>
