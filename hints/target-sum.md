<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(n * m)</code> time and <code>O(n * m)</code> space, where <code>n</code> is the size of the input array and <code>m</code> is the sum of all the elements in the array.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    Try to think in terms of recursion and visualize it as a decision tree, where we have two choices at each recursion step: assigning a positive or negative sign.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We recursively iterate through the array using index <code>i</code>, tracking the current sum along the recursive path. Each step branches into two paths, and we sum the number of ways to reach the target. If the index <code>i</code> goes out of bounds, we return <code>1</code> if the current sum equals the target; otherwise, we return <code>0</code>.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    This approach is exponential. We can use memoization to cache recursive call results and avoid redundant calculations. A hash map or a <code>2D</code> array with modifications can be used for caching. If using a <code>2D</code> array, the dimensions can be <code>(n * (2m + 1))</code>, where <code>n</code> is the array size and <code>m</code> represents the sum of the array elements.
    </p>
</details>
