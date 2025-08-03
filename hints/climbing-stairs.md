<br>
<details class="hint-accordion">  
    <summary>Recommended Time & Space Complexity</summary>
    <p>
    You should aim for a solution as good or better than <code>O(n)</code> time and <code>O(n)</code> space, where <code>n</code> is the number of steps.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 1</summary>
    <p>
    At each step, we have two choices: climb one step or climb two steps. We can solve this by considering both options and picking the minimum using recursion. However, this results in <code>O(2^n)</code> time complexity. Can you think of a better approach? Perhaps, try to avoid the repeated work of calling recursion more than once with same parameters.
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 2</summary>
    <p>
    This is a Dynamic Programming problem. We can use Memoization to avoid repeated work. Create an <code>n</code>-sized array <code>cache</code> to store the results of recursive calls. When the recursion is called with specific parameters, return the stored value if it has already been computed. How would you implement this?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 3</summary>
    <p>
    We start the initial recursion with <code>i = 0</code>, indicating that we are at position <code>i</code>. We first check if the current recursion with the given <code>i</code> is already cached. If it is, we immediately return the stored value. Otherwise, we perform the recursion, store the result in the cache, and then return it. Can you think of the base condition to stop the recursion?
    </p>
</details>

<br>
<details class="hint-accordion">  
    <summary>Hint 4</summary>
    <p>
    At each recursion, we perform two recursive calls: one for climbing one step and another for climbing two steps. The minimum return value between the two is the result for the current recursion. The base condition is to return <code>0</code> if <code>i == n</code>. This is a one-dimensional dynamic programming problem, which can be further optimized using more advanced techniques.
    </p>
</details>
