<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(n)</code> time and <code>O(n)</code> space, where <code>n</code> is the number of houses.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    First, consider solving the problem to get the maximum money after robbing without the condition that 'the first and last houses are adjacent'. Can you express this using a recurrence relation? Perhaps you could draw a decision tree, as at each step, you can either rob the current house and skip the next one or skip the current house and move to the next.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    The recurrence relation can be expressed as <code>max(nums[i] + dfs(i + 2), dfs(i + 1))</code>, where <code>i</code> is the current house and <code>dfs</code> is the recursive function. The base condition for this recursion would be to return <code>0</code> when <code>i</code> goes out of bounds. This solution results in <code>O(2^n)</code> time complexity because, at each recursive step, we branch into two paths. Can you think of a way to avoid recalculating the result for the same recursive call multiple times?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We can use memoization to store the result of a recursive function in a hash map or an array and immediately return this value when the function is called again with the same parameter values. How would you implement this? How would you solve the problem if the first and last houses are adjacent to each other? Perhaps you should consider skipping any one house between the two.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We can create two arrays from the given array. The first will include houses from the first house to the second-to-last house, and the second will include houses from the second house to the last house. We can run the recursive function on both arrays independently and return the maximum result between the two. Advanced techniques such as bottom-up dynamic programming can further optimize the solution.
    </p>
</details>
