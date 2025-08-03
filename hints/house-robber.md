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
    Can you think of this problem in terms of recursion? Consider drawing a decision tree where, at each step, we can choose to rob the house or skip it. If we rob the current house, we cannot rob the next or the previous house. Can you derive a recurrence relation to solve the problem?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    We can recursively start from the first house and branch paths accordingly. If we rob the current house, we skip the next house; otherwise, we move to the next house. The recurrence relation can be expressed as <code>max(nums[i] + dfs(i + 2), dfs(i + 1))</code>, where <code>i</code> is the current house and <code>dfs</code> is the recursive function. Can you determine the base condition to stop the recursion?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    The base condition would be to return <code>0</code> when <code>i</code> goes out of bounds. This recursion can leads to <code>O(2^n)</code> time solution. Can you think of a better way? Maybe you should try to avoid recalculating the result for a recursive call.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    We can use Memoization to avoid recalculating the result multiple times for a recursive call. By storing the result of each recursive call in a hash map or an array using <code>i</code> as the parameter, we can immediately return the stored result if the recursion is called with the same <code>i</code> value again. Further optimization can be achieved using advanced techniques like Bottom-Up dynamic programming.
    </p>
</details>
