<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(n + (m * k))</code> time and <code>O(n)</code> space, where <code>n</code> is the number of cities, <code>m</code> is the number of flights, and <code>k</code> is the number of stops.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    Consider this as a graph problem where the cities are nodes and the flights are edges connecting two cities, with the ticket cost as the edge weight. Can you think of a shortest path algorithm to solve the problem? Perhaps a better algorithm than Dijkstra's that can intuitively handle the <code>k</code> stops condition.  
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can use the Bellman-Ford algorithm. Initialize a <code>prices</code> array of size <code>n</code> with <code>Infinity</code>, setting <code>prices[source] = 0</code>. These values describe the cost to reach a city from the source city. Iterate <code>(k + 1)</code> times (stops are 0-indexed), updating the cost to each city by extending paths from cities with valid costs. We only update the cost for a city if it is less than the previous cost. How would you implement this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    At each level of iteration, we go through the given flights and use them to update the price array with the minimum costs compared to the previous level. We use a temporary prices array at each level to store the updated costs. After completing all levels, we return the result stored in <code>prices[dst]</code>. If that value is <code>Infinity</code>, we return <code>-1</code> instead.
    </p>
</details>
