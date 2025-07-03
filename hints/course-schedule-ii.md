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
    Consider the problem as a graph where courses represent the nodes, and <code>prerequisite[i] = [a, b]</code> represents a directed edge from <code>a</code> to <code>b</code>. We need to determine whether the graph contains a cycle. Why? Because if there is a cycle, it is impossible to complete the courses involved in the cycle. Can you think of an algorithm to detect a cycle in a graph and also find the valid ordering if a cycle doesn't exist?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use DFS to detect a cycle in a graph. However, we also need to find the valid ordering of the courses, which can also be achieved using DFS. Alternatively, we can use the Topological Sort algorithm to find the valid ordering in this directed graph, where the graph must be acyclic to complete all the courses, and the prerequisite of a course acts as the parent node of that course. How would you implement this? 
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We compute the indegrees of all the nodes. Then, we perform a BFS starting from the nodes that have no parents (<code>indegree[node] == 0</code>). At each level, we traverse these nodes, decrement the indegree of their child nodes, and append those child nodes to the queue if their indegree becomes <code>0</code>. We only append nodes whose indegree is <code>0</code> or becomes <code>0</code> during the BFS to our result array. If the length of the result array is not equal to the number of courses, we return an empty array.
    </p>
</details>
