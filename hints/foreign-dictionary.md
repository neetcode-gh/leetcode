<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(N + V + E)</code> time and <code>O(V + E)</code> space, where <code>N</code> is the sum of the lengths of all the strings, <code>V</code> is the number of unique characters (vertices), and <code>E</code> is the number of edges.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    Can you think of this as a graph problem? Characters from <code>a</code> through <code>z</code> are nodes. What could the edges represent here? How can you create edges from the given words? Perhaps you should try comparing two adjacent words.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    The relative ordering of the characters can be treated as edges. For example, consider the words ordered as <code>["ape", "apple"]</code>. <code>"ape"</code> comes before <code>"apple"</code>, which indicates that <code>'e'</code> is a predecessor of <code>'p'</code>. Therefore, there is a directed edge <code>e -> p</code>, and this dependency should be valid across all the words. In this way, we can build an adjacency list by comparing adjacent words. Can you think of an algorithm that is suitable to find a valid ordering?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We can use Topological Sort to ensure every node appears after its predecessor. Using DFS, we traverse the graph built from the adjacency list. A visited map tracks nodes in the current DFS path: <code>False</code> means not in the path, and <code>True</code> means in the path. If any DFS call returns <code>True</code>, it indicates a cycle and we return immediately. How do we extract the ordering from this DFS?  
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    When we visit a node and its children and don't find a cycle, we mark the node as <code>False</code> in the map and append it to the result, treating this as a post-order traversal. If we find a cycle, we return an empty string; otherwise, we return the result list.
    </p>
</details>
