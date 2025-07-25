<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(ElogE)</code> time and <code>O(E)</code> space, where <code>E</code> is the number of tickets (edges).
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    Consider this problem as a graph where airports are the nodes and tickets are the edges. Since we need to utilize all the tickets exactly once, can you think of an algorithm that visits every edge exactly once? Additionally, how do you ensure the smallest lexical order is maintained?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We build an adjacency list from the given tickets, which represent directed edges. We perform a DFS to construct the result, but we first sort the neighbors' list of each node to ensure the smallest lexical order. Why? Sorting guarantees that during DFS, we visit the node with the smallest lexical order first.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    DFS would be a naive solution, as it takes <code>O(E * V)</code> time, where <code>E</code> is the number of tickets (edges) and <code>V</code> is the number of airports (nodes). In this approach, we traverse from the given source airport <code>JFK</code>, perform DFS by removing the neighbor, traversing it, and then reinserting it back. Can you think of a better way? Perhaps an advanced algorithm that incorporates DFS might be helpful?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We can use Hierholzer's algorithm, a modified DFS approach. Instead of appending the node to the result list immediately, we first visit all its neighbors. This results in a post-order traversal. After completing all the DFS calls, we reverse the path to obtain the final path, which is also called Euler's path.
    </p>
</details>
