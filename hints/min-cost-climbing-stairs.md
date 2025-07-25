<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(n)</code> time and <code>O(n)</code> space, where <code>n</code> is the number of steps on the staircase.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    Can you find the recurrence relation to solve the problem, given that at each step we have two options: going one step or two steps? Consider drawing a decision tree where we branch into two paths at each step. By exploring every path, we can get the minimum cost. However, this results in an <code>O(2^n)</code> time solution. Can you think of a better approach? Is there any repeated work in the decision tree that we can optimize?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    The recurrence relation can be expressed as <code>cost[i] + min(dfs(i + 1), dfs(i + 2))</code>, where <code>i</code> is the current position and <code>dfs</code> is the recursive function. To avoid recalculating the result of a recursive call multiple times, we can use Memoization. Initialize a <code>cache</code> array of size <code>n</code>, where <code>n</code> is the number of steps on the staircase. How would you implement this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We start the recursion from positions <code>0</code> and <code>1</code>. At each recursive step, before computing the result, we check if the result for the current position has already been calculated. If it has, we return the stored value. Otherwise, we calculate the result for the current position, store it in the cache, and then return the result. What can be the base condition for this recursion to stop?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    The base condition would be to return <code>0</code> if we are at the top of the staircase <code>i >= n</code>. This is a one-dimensional dynamic programming problem. We can further optimize the memoization solution by using advanced techniques such as Bottom-Up dynamic programming based on the recurrance relation.
    </p>
</details>
