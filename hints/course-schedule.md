<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(V + E)</code> time and <code>O(V + E)</code> space, where <code>V</code> is the number of courses (nodes) and <code>E</code> is the number of prerequisites (edges). 
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    Consider the problem as a graph where courses represent the nodes, and <code>prerequisite[i] = [a, b]</code> represents a directed edge from <code>a</code> to <code>b</code>. We need to determine whether the graph contains a cycle. Why? Because if there is a cycle, it is impossible to complete the courses involved in the cycle. Can you think of an algorithm to detect cycle in a graph?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use the Depth First Search (DFS) algorithm to detect a cycle in a graph. We iterate over each course, run a DFS from that course, and first try to finish its prerequisite courses by recursively traversing through them. To detect a cycle, we initialize a hash set called <code>path</code>, which contains the nodes visited in the current DFS call. If we encounter a course that is already in the <code>path</code>, we can conclude that a cycle is detected. How would you implement it?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
     We run a DFS starting from each course by initializing a hash set, <code>path</code>, to track the nodes in the current DFS call. At each step of the DFS, we return <code>false</code> if the current node is already in the <code>path</code>, indicating a cycle. We recursively traverse the neighbors of the current node, and if any of the neighbor DFS calls detect a cycle, we immediately return <code>false</code>. Additionally, we clear the neighbors list of a node when no cycle is found from that node to avoid revisiting those paths again.
    </p>
</details>