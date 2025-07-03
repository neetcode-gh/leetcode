<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution with <code>O(n * t)</code> time and <code>O(t)</code> space, where <code>n</code> is the number of coins and <code>t</code> is the given amount.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    Think of this problem in terms of recursion and try to visualize the decision tree, as there are multiple choices at each step. We start with the given amount. At each step of recursion, we have <code>n</code> coins and branch into paths using coins that are less than or equal to the current amount. Can you express this in terms of a recurrence relation? Also, try to determine the base condition to stop the recursion.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    If the amount is <code>0</code>, we return <code>0</code> coins. The recurrence relation can be expressed as <code>min(1 + dfs(amount - coins[i]))</code>, where we return the minimum coins among all paths. This results in an <code>O(n ^ t)</code> solution, where <code>n</code> is the number of coins and <code>t</code> is the total amount. Can you think of a better approach? Perhaps consider the repeated work and find a way to avoid it.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We can use memoization to avoid the repeated work of calculating the result for each recursive call. A hash map or an array of size <code>t</code> can be used to cache the computed values for a specific <code>amount</code>. At each recursion step, we iterate over every coin and extend only the valid paths. If a result has already been computed, we return it from the cache instead of recalculating it.
    </p>
</details>
