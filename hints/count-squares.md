<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(1)</code> time for each <code>add()</code> call, <code>O(n)</code> time for each <code>count()</code> call, and <code>O(n)</code> space, where <code>n</code> is the total number of points.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    Initially, we can store the points in a global list for the <code>add()</code> call. For the <code>count()</code> call, a brute force approach would use three nested loops to check other points except for the query point, resulting in an <code>O(n^3)</code> time solution. Can you think of a better way? Maybe you should consider the observation that can be drawn from the diagonal of a square.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    In a square's diagonal, the absolute difference between the x-coordinates is equal to the absolute difference between the y-coordinates of the two endpoints, and neither difference can be zero. Using these two points, we can determine the other diagonal endpoints.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We store points in a hash map instead of a list for <code>O(1)</code> lookups, treating duplicate points as one while tracking their frequencies. For the <code>count()</code> function, we iterate through points that, along with the query point, can form a diagonal. Let the query point be <code>(qx, qy)</code> and the other point be <code>(x, y)</code>, ensuring they form a diagonal. What could be the other two points? Maybe you should consider the points forming a right-to-left diagonal, treating <code>(qx, qy)</code> as the top-right corner.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    The other two points are point1 <code>(x, qy)</code> and point2 <code>(qx, y)</code>. For counting, we simply add <code>count of point1 * count of point2</code> to the result <code>res</code>.
    </p>
</details>
